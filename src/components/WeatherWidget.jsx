import { useEffect, useState } from 'react'
import axios from 'axios'
import { CloudRain, CloudSun, Droplets, LoaderCircle, MapPin, RefreshCw, Sun, Thermometer, Umbrella } from 'lucide-react'
import styles from './WeatherWidget.module.css'

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

function describeWeather(code) {
  if (code === 0) return 'Céu limpo'
  if (code <= 3) return 'Parcialmente nublado'
  if (code === 45 || code === 48) return 'Neblina'
  if (code <= 57) return 'Garoa'
  if (code <= 67 || code === 80 || code === 81) return 'Chuva'
  if (code === 82) return 'Chuva forte'
  if (code <= 86) return 'Neve'
  if (code >= 95) return 'Trovoadas'
  return 'Condição variável'
}

function weatherIcon(code) {
  if (code === 0) return Sun
  if (code <= 3) return CloudSun
  if ((code >= 51 && code <= 82) || code >= 95) return CloudRain
  return Umbrella
}

function getRisk(chance, rainfall) {
  if (rainfall >= 20) return { level: 'high', title: 'Alerta: risco de acúmulo de água', message: 'Volume elevado previsto. Acompanhe a drenagem e os níveis da piscina.' }
  if (chance >= 60 || rainfall >= 10) return { level: 'attention', title: 'Atenção: probabilidade de chuva alta', message: 'A chuva pode alterar a água da piscina. Revise a previsão antes de fazer manutenção.' }
  return { level: 'normal', title: 'Status: Normal', message: 'Sem previsão de chuva significativa para hoje.' }
}

export default function WeatherWidget({ latitude = -23.5505, longitude = -46.6333, location = 'São Paulo, SP' }) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    async function loadWeather() {
      setLoading(true)
      setError('')
      try {
        const response = await axios.get(FORECAST_URL, {
          params: {
            latitude,
            longitude,
            current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code',
            daily: 'precipitation_probability_max,precipitation_sum',
            timezone: 'auto',
            forecast_days: 1,
          },
          signal: controller.signal,
        })
        setWeather(response.data)
      } catch (requestError) {
        if (requestError.code !== 'ERR_CANCELED') setError('Não foi possível carregar a previsão agora.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    loadWeather()
    return () => controller.abort()
  }, [latitude, longitude, retry])

  if (loading) return <section className={styles.card} aria-live="polite" aria-busy="true"><div className={styles.loading}><LoaderCircle className={styles.spinner} size={20}/><span>Carregando previsão do tempo…</span></div></section>
  if (error || !weather?.current || !weather?.daily) return <section className={styles.card} aria-live="polite"><div className={styles.error}><p>{error || 'A previsão não está disponível no momento.'}</p><button onClick={() => setRetry(value => value + 1)}><RefreshCw size={14}/> Tentar novamente</button></div></section>

  const current = weather.current
  const rainChance = weather.daily.precipitation_probability_max?.[0] ?? 0
  const rainfall = weather.daily.precipitation_sum?.[0] ?? 0
  const risk = getRisk(rainChance, rainfall)
  const WeatherIcon = weatherIcon(current.weather_code)
  const updatedAt = current.time ? new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: weather.timezone }).format(new Date(current.time)) : ''

  return <section className={styles.card} aria-label="Previsão do tempo e alerta de chuva">
    <div className={styles.header}><div className={styles.heading}><span className={styles.icon}><WeatherIcon size={19}/></span><div><b>Clima agora</b><span><MapPin size={12}/>{location}</span></div></div><span className={styles.updated}>Atualizado {updatedAt}</span></div>
    <div className={styles.current}><strong>{Math.round(current.temperature_2m)}°</strong><div><b>{describeWeather(current.weather_code)}</b><span>Sensação de {Math.round(current.apparent_temperature)}°C</span></div></div>
    <div className={styles.details}><span><Droplets size={15}/><b>{current.relative_humidity_2m}%</b> umidade</span><span><CloudRain size={15}/><b>{rainChance}%</b> chance de chuva</span><span><Umbrella size={15}/><b>{rainfall.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mm</b> hoje</span></div>
    <div className={`${styles.risk} ${styles[risk.level]}`}><span className={styles.riskIcon}><Thermometer size={16}/></span><div><b>{risk.title}</b><p>{risk.message}</p></div></div>
    <small className={styles.source}>Previsão Open-Meteo · dados meteorológicos, não medição do sensor AquaSense.</small>
  </section>
}
