<template>
  <header class="app-header">
    <nav class="nav">
      <NuxtLink to="/" class="logo">Nuxt3 Template</NuxtLink>
      <div class="nav-links">
        <NuxtLink to="/">ホーム</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #667eea;
}

.nav-links a.router-link-active {
  color: #667eea;
  border-bottom: 2px solid #667eea;
}
</style>
