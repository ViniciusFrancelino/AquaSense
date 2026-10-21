import { useMemo, useState } from 'react'
import {
  createRandomReadings,
  getMetricStatus,
  getRecommendation,
  getPlanPrice,
  getWaterStatus,
  INITIAL_HISTORY,
  INITIAL_READINGS,
  TESTIMONIALS,
} from '../models/aquaSenseModel.js'

export default function useAquaSenseViewModel() {
  const [readings, setReadings] = useState(INITIAL_READINGS)
  const [history, setHistory] = useState(INITIAL_HISTORY)
  const [faqOpen, setFaqOpen] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [annualBilling, setAnnualBilling] = useState(false)

  const status = useMemo(() => getWaterStatus(readings), [readings])
  const metricStatuses = useMemo(() => Object.fromEntries(
    Object.entries(readings).map(([key, value]) => [key, getMetricStatus(key, value)]),
  ), [readings])
  const recommendation = useMemo(() => getRecommendation(readings), [readings])

  function updateReading(key, value) {
    setReadings(current => ({ ...current, [key]: value }))
  }

  function generateReadings() {
    const next = createRandomReadings()
    setReadings(next)
    setHistory(current => [next, ...current].slice(0, 5))
  }

  function choosePlan(plan) {
    setSelectedPlan({ ...plan, price: getPlanPrice(plan.price, annualBilling) })
    setConfirmed(false)
  }

  function getDisplayedPlanPrice(price) {
    return getPlanPrice(price, annualBilling)
  }

  function showPreviousTestimonial() {
    setTestimonialIndex(current => (current + TESTIMONIALS.length - 1) % TESTIMONIALS.length)
  }

  function showNextTestimonial() {
    setTestimonialIndex(current => (current + 1) % TESTIMONIALS.length)
  }

  function showTestimonial(index) {
    setTestimonialIndex(index)
  }

  function setBillingCycle(isAnnual) {
    setAnnualBilling(isAnnual)
  }

  function closePlanDialog() {
    setSelectedPlan(null)
  }

  function toggleMobileMenu() {
    setMobileOpen(current => !current)
  }

  function closeMobileMenu() {
    setMobileOpen(false)
  }

  function toggleFaq(index) {
    setFaqOpen(current => current === index ? -1 : index)
  }

  function confirmPlan() {
    setConfirmed(true)
  }

  return {
    readings,
    history,
    faqOpen,
    selectedPlan,
    mobileOpen,
    confirmed,
    testimonialIndex,
    annualBilling,
    status,
    metricStatuses,
    recommendation,
    updateReading,
    generateReadings,
    choosePlan,
    getDisplayedPlanPrice,
    showPreviousTestimonial,
    showNextTestimonial,
    showTestimonial,
    setBillingCycle,
    closePlanDialog,
    toggleMobileMenu,
    closeMobileMenu,
    toggleFaq,
    confirmPlan,
  }
}
