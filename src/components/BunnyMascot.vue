<script setup lang="ts">
import { computed } from "vue";
import styles from "./BunnyMascot.module.css";

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

const showBook = computed(
  () => props.mood === "idle" || props.mood === "think",
);
</script>

<template>
  <div
    :class="[styles.wrap, styles[size], styles[mood]]"
    aria-hidden="true"
  >
    <svg viewBox="0 0 120 140" :class="styles.svg">
      <!-- Ears -->
      <g :class="styles.earLeftGroup">
        <ellipse
          :class="styles.earLeft"
          cx="34"
          cy="20"
          rx="13"
          ry="40"
          transform="rotate(-18 34 20)"
        />
        <ellipse
          :class="styles.earInnerLeft"
          cx="34"
          cy="22"
          rx="5.5"
          ry="26"
          transform="rotate(-18 34 22)"
        />
      </g>
      <g :class="styles.earRightGroup">
        <ellipse
          :class="styles.earRight"
          cx="86"
          cy="20"
          rx="13"
          ry="40"
          transform="rotate(18 86 20)"
        />
        <ellipse
          :class="styles.earInnerRight"
          cx="86"
          cy="22"
          rx="5.5"
          ry="26"
          transform="rotate(18 86 22)"
        />
      </g>

      <!-- Cottontail behind body -->
      <circle :class="styles.tail" cx="95" cy="110" r="9" />

      <ellipse :class="styles.body" cx="60" cy="94" rx="36" ry="40" />
      <ellipse :class="styles.belly" cx="60" cy="100" rx="21" ry="23" />

      <!-- Front paws -->
      <g :class="styles.armLeftGroup">
        <ellipse :class="styles.arm" cx="26" cy="100" rx="11" ry="13" />
      </g>
      <g :class="styles.armRightGroup">
        <ellipse :class="styles.arm" cx="94" cy="100" rx="11" ry="13" />
      </g>

      <!-- Book (idle / think) -->
      <g v-if="showBook" :class="styles.book">
        <rect
          x="46"
          y="96"
          width="28"
          height="22"
          rx="3"
          :class="styles.bookCover"
        />
        <rect
          x="48"
          y="98"
          width="11"
          height="18"
          rx="1.5"
          :class="styles.bookPage"
        />
        <rect
          x="61"
          y="98"
          width="11"
          height="18"
          rx="1.5"
          :class="styles.bookPage"
        />
        <line
          x1="60"
          y1="98"
          x2="60"
          y2="116"
          :class="styles.bookSpine"
        />
      </g>

      <g :class="styles.face">
        <circle :class="styles.head" cx="60" cy="62" r="34" />
        <circle :class="styles.cheek" cx="38" cy="70" r="8" />
        <circle :class="styles.cheek" cx="82" cy="70" r="8" />

        <!-- Eyes: open (idle/think/cheer) or soft for sad -->
        <template v-if="mood === 'sad'">
          <path
            :class="styles.eyeSad"
            d="M40 60 Q48 66 56 60"
            fill="none"
            stroke-width="2.4"
            stroke-linecap="round"
          />
          <path
            :class="styles.eyeSad"
            d="M64 60 Q72 66 80 60"
            fill="none"
            stroke-width="2.4"
            stroke-linecap="round"
          />
        </template>
        <template v-else>
          <circle :class="styles.eye" cx="47" cy="58" r="4.8" />
          <circle :class="styles.eye" cx="73" cy="58" r="4.8" />
          <circle :class="styles.eyeShine" cx="45.2" cy="56.2" r="1.6" />
          <circle :class="styles.eyeShine" cx="71.2" cy="56.2" r="1.6" />
        </template>

        <path
          :class="styles.nose"
          d="M60 66 L55 72 L65 72 Z"
        />
        <path
          :class="styles.mouth"
          :d="
            mood === 'sad'
              ? 'M54 80 Q60 76 66 80'
              : mood === 'cheer'
                ? 'M52 78 Q60 86 68 78'
                : 'M55 78 Q60 83 65 78'
          "
          fill="none"
          stroke-width="2.2"
          stroke-linecap="round"
        />
      </g>

      <ellipse :class="styles.foot" cx="42" cy="126" rx="15" ry="9" />
      <ellipse :class="styles.foot" cx="78" cy="126" rx="15" ry="9" />
    </svg>
  </div>
</template>
