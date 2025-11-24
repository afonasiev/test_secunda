<script setup lang="ts">
import type { Colors } from "@/components/ui/button/types";

interface Props {
  title: string;
  text: string;
  btnAccept?: Colors;
  btnDecline?: Colors;
}

const model = defineModel<boolean>();
const modal = ref<HTMLInputElement | null>(null);
const emits = defineEmits(["accept"]);
const {
  title,
  text,
  btnDecline = "red",
  btnAccept = "green",
} = defineProps<Props>();

const close = (event: MouseEvent) => {
  const rect = modal.value?.getBoundingClientRect();
  if (rect !== undefined) {
    const isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      model.value = false;
    }
  }
};
const accept = () => {
  model.value = false;
  emits("accept");
};

watch(
  () => model.value,
  () => {
    if (model.value) {
      modal.value?.showModal();
    } else {
      modal.value?.close();
    }
  },
);
</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <dialog
        ref="modal"
        :class="$style.modal"
        aria-labelledby="dialog"
        @click="close"
      >
        <div :class="$style.header">
          <h3 :class="$style.heading">{{ title }}</h3>
        </div>
        <div :class="$style.body">
          <p :class="$style.text">{{ text }}</p>
          <div :class="$style.group">
            <ui-button @click="accept" :color="btnAccept">Да</ui-button>
            <ui-button @click="model = false" :color="btnDecline">
              Нет
            </ui-button>
          </div>
        </div>
      </dialog>
    </transition>
  </Teleport>
</template>

<style module lang="scss">
.modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 30%;
  margin: auto;
  padding: 32px;
  min-width: 320px;
  width: 400px;
  border-radius: 8px;
  background-color: var(--color-background-item);
  border-color: var(--border-color);
  &::backdrop {
    //opacity: 0;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
  }
}
.heading {
  color: var(--color-text);
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
.text {
  color: var(--color-text);
  font-size: 16px;
  text-align: center;
}
.header {
  margin-bottom: 32px;
}
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.group {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 16px;
}
</style>
