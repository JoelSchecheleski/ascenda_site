# App

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Otimizações de Performance

### Sistema de Cache de Busca

Para reduzir o custo de backend e melhorar a experiência do usuário, implementamos um sistema de cache inteligente:

#### 1. **Cache no PropertyService**
- **Localização**: `src/app/services/property.service.ts`
- **Duração**: 5 minutos
- **Funcionamento**: 
  - Armazena resultados de buscas em memória
  - Chave de cache baseada em parâmetros de busca (JSON)
  - Limpeza automática de entradas expiradas
  - **Redução estimada**: 60-70% nas chamadas ao backend

#### 2. **Debouncing de Buscas e Filtros**
- **Componentes implementados**:
  - `property-feature.ts` (HOME): 500ms para texto, 300ms para dropdowns
  - `buy.ts`: 500ms para buscas
  - `grid-map.ts`: 500ms para filtros
- **Funcionamento**: 
  - Aguarda o usuário parar de digitar/selecionar antes de buscar
  - Cancela requisições pendentes quando nova entrada é detectada
  - **Redução estimada**: 30-40% nas chamadas ao backend

#### 3. **Monitoramento de Cache**

No console do navegador, você verá:
- `✅ Cache HIT` - Dados retornados do cache (sem chamada ao backend)
- `❌ Cache MISS` - Dados buscados do servidor (com chamada ao backend)
- `💾 Resposta armazenada no cache` - Novos dados salvos no cache

### Impacto Total Estimado

Com as otimizações implementadas:
- **Redução total**: ~70-80% nas chamadas ao endpoint `/properties/search`
- **Melhoria na UX**: Respostas instantâneas para buscas repetidas
- **Redução de custos**: Significativa economia no backend

### Configuração do Cache

Para ajustar a duração do cache, edite a constante em `property.service.ts`:

```typescript
private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos em milissegundos
```

### Próximas Otimizações Recomendadas

1. **HTTP Interceptor com Cache**: Cache automático para todos os endpoints GET
2. **Service Worker**: Cache offline com sincronização
3. **LocalStorage**: Persistência de cache entre sessões
4. **Lazy Loading de Imagens**: Carregamento sob demanda
5. **Virtual Scrolling**: Para listas longas de imóveis

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
