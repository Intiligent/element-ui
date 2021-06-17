<template>
  <li class="el-menu-item-group">
    <div class="el-menu-item-group__title" :class="'deep-' + levelDeep">
      <template v-if="!$slots.title">{{title}}</template>
      <slot v-else name="title"></slot>
    </div>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>
<script>
  export default {
    name: 'ElMenuItemGroup',

    componentName: 'ElMenuItemGroup',

    inject: ['rootMenu'],
    props: {
      title: {
        type: String
      }
    },
    data() {
      return {
        paddingLeft: 20
      };
    },
    computed: {
      levelDeep() {
        let deep = 0;
        let parent = this.$parent;
        if (this.rootMenu.collapse) {
          return 1;
        }
        while (parent && parent.$options.componentName !== 'ElMenu') {
          if (parent.$options.componentName === 'ElSubmenu') {
            deep += 1;
          }
          parent = parent.$parent;
        }
        return deep;
      }
    }
  };
</script>
