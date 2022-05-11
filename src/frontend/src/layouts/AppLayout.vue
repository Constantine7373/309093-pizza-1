<template>
  <body>
    <slot name="header" />
    <slot />
  </body>
</template>

<script>
export default {
  name: "AppLayout",
};
</script>
