<script setup lang="ts">
type BunnyMood = "idle" | "think" | "cheer" | "sad";

const props = withDefaults(
  defineProps<{
    mood?: BunnyMood;
    size?: "sm" | "md" | "lg";
  }>(),
  {
    mood: "idle",
    size: "md",
  },
);
</script>

<template>
  <div :class="['wrap', size, mood]" aria-hidden="true">
    <img
      :src="`/mascot/bunny-${props.mood}.webp`"
      class="img"
      alt=""
      draggable="false"
    />
  </div>
</template>

<style scoped lang="scss">
.wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform-origin: center bottom;
}

.img {
  width: 100%;
  height: auto;
  display: block;
  pointer-events: none;
  user-select: none;
}

.sm {
  width: 72px;
}

.md {
  width: 140px;
}

.lg {
  width: 200px;
}

.idle {
  animation: float 3.2s ease-in-out infinite;
}

.think {
  animation: thinkSway 2.8s ease-in-out infinite;
}

.cheer {
  animation: cheerJump 0.95s var(--ease-bounce);
}

.sad {
  animation: sadSigh 2.4s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes thinkSway {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-4px) rotate(-2deg);
  }
}

@keyframes cheerJump {
  0% {
    transform: scale(1, 1) translateY(0) rotate(0deg);
  }
  18% {
    transform: scale(1.08, 0.88) translateY(4px) rotate(0deg);
  }
  40% {
    transform: scale(0.94, 1.08) translateY(-26px) rotate(-5deg);
  }
  65% {
    transform: scale(1.02, 0.98) translateY(-10px) rotate(4deg);
  }
  100% {
    transform: scale(1) translateY(0) rotate(0deg);
  }
}

@keyframes sadSigh {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  40% {
    transform: translateY(3px) scale(1.02, 0.96);
  }
  70% {
    transform: translateY(1px) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .wrap,
  .idle,
  .think,
  .cheer,
  .sad {
    animation: none;
  }
}
</style>
