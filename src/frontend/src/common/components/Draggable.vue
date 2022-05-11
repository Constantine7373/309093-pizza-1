<template>
  <div @mouseover="setDraggable" @mouseout="unsetDraggable">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "draggable",
  props: {
    dragClass: {
      type: String,
      default: null,
      validator: (v) => {
        return v.startsWith(".")
          ? true
          : console.error("draggable parameter must be a class selector");
      },
    },
    dropClass: {
      type: String,
      default: null,
      validator: (v) => {
        return v.startsWith(".")
          ? true
          : console.error("draggable parameter must be a class selector");
      },
    },
    dragDisabled: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    dragDisabled: function () {
      let item = this.itemToDrag;
      this.dragDisabled
        ? (item.style.cursor = "no-drop")
        : (item.style.cursor = null);
    },
  },
  computed: {
    itemToDrag: function () {
      let item =
        this.dragClass !== null
          ? this.$el.querySelector(this.dragClass)
          : this.$el;
      return item;
    },
    itemToDrop: function () {
      let item =
        this.dropClass !== null ? document.querySelector(this.dropClass) : null;
      item !== null ? item : console.error("invalid draggable element");
      return item;
    },
  },
  methods: {
    setDraggable: function () {
      if (!this.dragDisabled) {
        this.itemToDrag.setAttribute("draggable", true);
        this.itemToDrag.addEventListener("dragstart", this.onDragStart);
      }
    },
    unsetDraggable: function () {
      this.itemToDrag.removeAttribute("draggable");
    },
    onDragStart: function () {
      if (this.itemToDrop != null) {
        this.itemToDrop.addEventListener("dragover", this.onDragOver);
        this.itemToDrop.addEventListener("drop", this.onDrop);
      }
    },
    onDragOver: function (e) {
      e.preventDefault();
    },
    onDrop: function (e) {
      e.preventDefault();
      this.$emit("drop", { dropTarget: this.itemToDrop });
      this.itemToDrop.removeEventListener("drop", this.onDrop);
    },
  },
};
</script>
