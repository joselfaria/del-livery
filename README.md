## 1. Configuração do Ambiente Local

Para executar e testar o aplicativo em ambiente de desenvolvimento:

### Pré-requisitos

* Node.js instalado

### Aplicativo de Teste

* Instalar o **Expo Go** no dispositivo móvel (Android ou iOS)

### Instalação de Dependências

No diretório raiz do projeto:

```bash
npm install
```

### Inicialização do Servidor

```bash
npx expo start -c
```

* A flag `-c` limpa o cache e evita erros após alterações estruturais

### Execução

* Escanear o QR Code:

  * Android: via Expo Go
  * iOS: via câmera nativa
* **Importante:** computador e celular devem estar na mesma rede Wi-Fi

---

## 2. Padrão Arquitetural

O projeto segue o padrão **Container-Presenter**, visando organização e escalabilidade.

### Estrutura (`src/`)

#### 📂 `styles/` (Estilização)

* Arquivos `.ts` com `StyleSheet`
* Exemplo: `cadastro.ts`

#### 📂 `views/` (Apresentação)

* Componentes visuais (sem lógica de negócio)
* Recebem dados e funções via props
* Exemplo: `cadastro-associado-view.tsx`

#### 📂 `app/` (Lógica / Rotas)

* Gerenciado pelo Expo Router
* Cada arquivo representa uma rota
* Responsável por:

  * Estado (`useState`)
  * Regras de negócio
  * Persistência
  * Integração com Views

---

## 3. Persistência de Dados (Simulação)

Uso de **AsyncStorage** para armazenamento local (formato JSON).

### Chaves padronizadas:

* **Comerciantes (Associados):**

  ```
  @usuarios_associados
  ```

* **Entregadores (Ciclistas):**

  ```
  @usuarios_ciclistas
  ```

* **Pedidos:**

  ```
  @pedidos_criados
  ```

---

## 4. Implementações Restantes

A base do sistema já contém:

* Tela inicial
* Cadastro de comerciante
* Validação básica de login

### 4.1. Módulo do Entregador

#### Cadastro

* Criar:

  * `src/styles/`
  * `src/views/`
* Implementar lógica em:

  ```
  src/app/cadastro-ciclista.tsx
  ```
* Salvar no AsyncStorage:

  ```
  @usuarios_ciclistas
  ```
* Incluir propriedade:

  ```json
  { "tipo": "ciclista" }
  ```

#### Login

* Arquivo:

  ```
  src/app/login.tsx
  ```
* Implementar:

  * Validação na chave `@usuarios_ciclistas`
  * Redirecionamento para:

    ```
    /painel-entregador
    ```

---

### 4.2. Módulo do Comerciante

#### Painel do Lojista

* Criar rota:

  ```
  src/app/painel-lojista.tsx
  ```

#### Criação de Pedidos

* Implementar fluxo completo seguindo padrão:

  * styles
  * views
  * app

#### Persistência

* Salvar pedidos em:

  ```
  @pedidos_criados
  ```

#### Listagem

* Ler dados da mesma chave
* Renderizar na View correspondente
