## Iconpicker

Iconpicker data using for select icon and other text like class name.

### Basic usage

:::demo

```html
<el-icon-picker v-model="input" style="width: 396px;"></el-icon-picker>

<script>
export default {
    data() {
        return {
            input: '',
        };
    },
}
</script>
```
:::

### Disabled

:::demo Disable the Input with the `disabled` attribute.

```html
<el-icon-picker v-model="input" style="width: 396px;" disabled></el-icon-picker>

<script>
export default {
    data() {
        return {
            input: 'el-icon-phone',
        };
    },
}
</script>
```
:::

### Sizes

:::demo Add `size` attribute to change the size of Input. In addition to the default size, there are three other options: `large`, `small` and `mini`.
```html
<div class="demo-input-size">
    <div class="">
        <label style="width: 150px; display: inline-block;" for="">Default size</label>
        <el-icon-picker v-model="input1" style="width: 396px;"></el-icon-picker>
    </div>
    <div class="" style="margin-top: 20px;">
        <label style="width: 150px; display: inline-block;" for="">Large size</label>
        <el-icon-picker size="large" v-model="input2" style="width: 396px;"></el-icon-picker>
    </div>
    <div class="" style="margin-top: 20px;">
        <label style="width: 150px; display: inline-block;" for="">Medium size</label>
        <el-icon-picker size="medium" v-model="input3" style="width: 396px;"></el-icon-picker>
    </div>
    <div class="" style="margin-top: 20px;">
        <label style="width: 150px; display: inline-block;" for="">Small size</label>
        <el-icon-picker size="small" v-model="input4" style="width: 396px;"></el-icon-picker>
    </div>
    <div class="" style="margin-top: 20px;">
        <label style="width: 150px; display: inline-block;" for="">Mini size</label>
        <el-icon-picker size="mini" v-model="input5" style="width: 396px;"></el-icon-picker>
    </div>
</div>

<script>
export default {
    data() {
        return {
            input1: 'el-icon-reading',
            input2: 'el-icon-reading',
            input3: 'el-icon-reading',
            input4: 'el-icon-reading',
            input5: 'el-icon-reading',
        };
    },
}
</script>
```
:::

### Custom icons

Customize your own icon set are displayed.

:::demo Use `icons` prop to pass your items.
```html
<el-icon-picker v-model="state" :icons="iconSet" @select="handleSelect"></el-icon-picker>

<script>
export default {
    data() {
        return {
            state: '',
            iconSet: [
                {name: 'icon-user'},
                {name: 'icon-pencil'},
                {name: 'icon-arrow-left'},
            ],
        };
    },
    methods: {
        handleSelect(value) {
            console.log(value);
        },
    },
}
</script>
```
:::

### Iconpicker Attributes

| Attribute      | Description          | Type      | Accepted Values       | Default  |
| ----| ----| ----| ---- | ----- |
|value / v-model| binding value | string / number| — | — |
|placeholder| placeholder of Input| string | — | — |
| clearable | whether to show clear button | boolean | — | false |
| icons | custome icon set| array         | ```[{name: 'icon-name'},...]``` |  |
|disabled | whether Input is disabled | boolean | — | false |
|size | size of Input, works when `type` is not 'textarea' | string | medium / small / mini | — |
|name | same as `name` in native input | string | — | — |
| readonly | same as `readonly` in native input | boolean | — | false |

### Iconpicker Events

| Event Name | Description | Parameters |
|----| ----| ----|
| blur | triggers when Input blurs | (event: Event) |
| focus | triggers when Input focuses | (event: Event) |
| change | triggers only when the input box loses focus or the user presses Enter | (value: string \| number) |
| input | triggers when the Input value change | (value: string \| number) |
| clear | triggers when the Input is cleared by clicking the clear button | — |

### Iconpicker Methods

| Method | Description | Parameters |
|------|--------|-------|
| focus | focus the input element | — |
| blur | blur the input element | — |
