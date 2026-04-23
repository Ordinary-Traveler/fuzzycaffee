# ☕ Fuzzy Coffee Roaster - Experiência de Raciocínio Nebuloso

Este projeto é uma aplicação prática de **Lógica Fuzzy (Raciocínio Nebuloso)** desenvolvida como complemento à disciplina de Inteligência Artificial. A aplicação simula um painel de controlo de uma cafeteria tecnológica onde a intensidade da torra do café é decidida por um motor de inferência fuzzy.

## 🎯 Objetivo
O sistema permite que o cliente defina o **Corpo** e a **Acidez** desejados através de termos linguísticos, transformando estas entradas vagas em valores precisos para a potência da máquina de torra.

## 🧠 Conceitos Fuzzy Aplicados

Baseado nos conceitos do **Capítulo 3 (Raciocínio Nebuloso)**, o projeto implementa:

1.  **Variáveis Linguísticas**: 
    - **Entradas**: Corpo (Leve, Médio, Encorpado) e Acidez (Baixa, Média, Alta).
    - **Saída**: Intensidade da Torra (Suave, Ideal, Forte).
2.  **Fuzzificação**: Utilização de funções de pertinência **Triangulares** e **Trapezoidais** para mapear entradas numéricas (0-100) em graus de pertinência $\mu \in [0, 1]$.
3.  **Base de Regras (Mamdani)**: 
    - Ex: *SE* o corpo é Encorpado *E* a acidez é Baixa, *ENTÃO* a torra é Forte.
    - Operadores Fuzzy: `AND` (Mínimo) e `OR` (Máximo).
4.  **Defuzzificação**: Implementação do cálculo de **Média Ponderada dos Centros** para obter o valor *crisp* final de saída.

## 🛠️ Tecnologias Utilizadas
- **HTML5 (Canvas)**: Para renderização em tempo real das funções de pertinência.
- **CSS3**: Estilização da interface da cafeteria.
- **JavaScript (Vanilla)**: Motor matemático fuzzy sem dependências externas.

## 🚀 Como Executar
1. Clone o repositório:
   ```bash
   
