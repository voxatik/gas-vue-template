# GAS Vue Template

## Buefy Components

Always use **PascalCase** for Buefy components, not kebab-case.

```vue
<!-- correct -->
<BButton type="is-primary" />
<BLoading :is-full-page="true" :active="loading" />
<BInput v-model="value" />

<!-- wrong -->
<b-button type="is-primary" />
<b-loading :is-full-page="true" :active="loading" />
<b-input v-model="value" />
```
