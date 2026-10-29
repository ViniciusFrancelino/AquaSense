# AquaSense

**Sua piscina sempre limpa, segura e pronta para uso.**

O **AquaSense** é o conceito de um produto para monitoramento inteligente de piscinas. Esta aplicação apresenta uma **landing page interativa**, com um simulador que permite acompanhar indicadores fictícios da qualidade da água e visualizar alertas e recomendações ilustrativas.

## Integrantes

- **[Vinicius Francelino]**
- **[Davi Jeronimo]**

## Sobre o produto

A proposta do AquaSense é simplificar a visualização de indicadores importantes na rotina de manutenção de piscinas residenciais. A página demonstra a experiência de um possível produto conectado, mostrando benefícios, funcionamento, planos de assinatura fictícios e uma interface de acompanhamento da água.

O público-alvo proposto inclui proprietários de piscinas residenciais e pessoas responsáveis por sua manutenção.

## Jornada de construção

### Ideia inicial

A Ideia do Produto, atraves de uma certa dificuldade para encontrar bons conteudos sobre a manutenção da piscina, medir e manter os parametros da agua para um maior aproveitamento da piscina

A ideia do produto surgiu a partir da dificuldade de encontrar conteúdos confiáveis e de fácil compreensão sobre a manutenção da piscina, especialmente em relação à medição e ao controle dos parâmetros da água, buscando garantir uma melhor conservação e aproveitamento da piscina.

Como surgiu a ideia do produto?

Eu tenho uma chácara e sou o responsável por realizar a manutenção da piscina. No início, tive dificuldade para encontrar informações corretas, precisas e confiáveis sobre os cuidados necessários e o controle adequado da água.

Quais alternativas foram consideradas?

Durante o planejamento, também consideramos outra ideia, chamada "ChordFlow", um sistema voltado ao ensino de violão de forma dinâmica e interativa. No entanto, optamos pela ideia relacionada à manutenção de piscinas por estar ligada a uma dificuldade real já vivenciada e por possuir uma aplicação prática mais direta.

### Pesquisa e referências

A identidade visual proposta usa tons de azul-claro, azul piscina, amarelo e branco, com referências no segmento de produtos para manutenção de piscinas.

O que vocês pesquisaram?

Pesquisamos sites e soluções relacionadas a equipamentos utilizados para medir os parâmetros da água da piscina, além de conteúdos e ferramentas que pudessem auxiliar no processo de manutenção.

Quais sites, produtos, estilos ou referências ajudaram na construção da solução?

Utilizamos como referência marcas conhecidas no segmento de produtos para limpeza e manutenção de piscinas, como HTH e GENCO, principalmente em relação à identidade visual, comunicação e organização das informações.

### Ferramentas utilizadas

## Tecnologias utilizadas

- React
- JavaScript
- Vite
- CSS Modules e CSS global
- Lucide React (ícones)
- HTML5

### Uso de MCP

O MCP foi utilizado como apoio durante o desenvolvimento no VS Code. Ele permite que ferramentas compatíveis disponibilizem contexto e funcionalidades externas ao assistente de programação, ajudando a consultar informações e orientar a implementação.

No AquaSense, o MCP não faz parte da aplicação executada pelo navegador: não há um servidor ou cliente MCP dentro do projeto. A integração meteorológica foi implementada diretamente no código com Axios, no componente `src/components/WeatherWidget.jsx`, que consulta a API pública Open-Meteo e apresenta temperatura, umidade, previsão de chuva e um indicador de risco. Essa abordagem mantém a chamada de clima simples para uma aplicação front-end e não exige uma camada MCP no runtime.

Assim, o MCP apoiou o fluxo de desenvolvimento no editor, enquanto a comunicação em tempo de execução com os dados meteorológicos ocorre via requisição HTTP do navegador para a Open-Meteo.

### Uso de inteligência artificial

### Uso de IA

O repositório contém o arquivo `prompt.md`, que reúne a especificação inicial utilizada para orientar a geração da aplicação.

Para a geração do código, utilizamos o `OpenCode` com o modelo `Codex 5.6 Luna`. Antes disso, criamos uma primeira versão do prompt e utilizamos o ChatGPT para refiná-lo, buscando deixá-lo mais claro e adequado ao escopo do projeto.

Inicialmente, a IA sugeriu a utilização da arquitetura FSD. Após avaliarmos a estrutura proposta, optamos por substituí-la pela arquitetura MVVM, por considerarmos que ela proporcionaria uma melhor compreensão e organização do código, além de estar mais alinhada com a preferência da equipe.

Além da definição da arquitetura, a utilização da IA também contribuiu para acelerar o desenvolvimento e melhorar a estrutura inicial da aplicação. De forma geral, o resultado obtido foi melhor do que o planejado inicialmente.

As sugestões geradas pela IA foram avaliadas durante o desenvolvimento. Algumas foram mantidas, enquanto outras foram ajustadas ou descartadas de acordo com as necessidades do projeto, como ocorreu na mudança da arquitetura de FSD para MVVM.

### Evolução da solução

**Diferenças constatadas entre o `prompt.md` e o código final:**

- O prompt prevê **FSD**, enquanto a implementação está organizada em **MVVM**.
- O prompt cita **turbidez**, enquanto a demonstração implementa **transparência (%)**.
- O gráfico do histórico é **ilustrativo/estático**; o histórico de valores de pH é atualizado em estado React.

### Resultado final

Como vocês avaliam o resultado?

Percebemos que o uso da IA facilitou significativamente o processo de desenvolvimento, principalmente na criação da estrutura inicial da aplicação e na definição do layout. Além de acelerar algumas etapas, a ferramenta contribuiu para que a interface tivesse uma aparência mais organizada e profissional.

O que fariam diferente se tivessem mais tempo?

Com mais tempo, dedicaríamos uma etapa maior ao refinamento dos prompts, buscando fornecer instruções mais detalhadas e específicas para obter resultados ainda mais alinhados com a proposta do projeto. Também realizaríamos uma pesquisa mais aprofundada sobre paleta de cores, identidade visual, tipografia e referências de interface, garantindo maior consistência entre os elementos da aplicação.

Além disso, investiríamos mais tempo em testes de usabilidade, responsividade, acessibilidade e revisão dos fluxos de navegação
