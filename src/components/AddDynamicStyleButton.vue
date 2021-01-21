<template>
    <div class="full-width">
        <div v-if="shouldShowForm == true">
            <div class="row">
                <div class="col"><q-input v-model="add_style_name" hint="Name" error-message="Name" dense :rules="[val => !!val || '']" /></div>
            </div>
            <div class="row">
                <div class="col">
                    <q-input v-model="add_style_element" hint="Element" error-message="Element" dense :rules="[val => !!val || '']" />
                </div>
                <div class="col">
                    <q-input v-model="add_style_class" hint="Class" error-message="Class" dense />
                </div>
            </div>
            <div class="row q-mt-sm">
                <div class="col q-pa-xs text-center">
                    <q-btn class="q-mx-auto" rounded icon="add" dense @click="createNewStyle" />
                </div>
                <div class="col q-pa-xs text-center">
                    <q-btn class="q-mx-auto" rounded icon="close" dense @click="shouldShowForm = !shouldShowForm" />
                </div>
            </div>
        </div>
        <div v-else class="full-width">
            <q-btn class="q-mx-auto" icon="add" rounded dense @click="shouldShowForm = !shouldShowForm" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddDynamicStyleButton',
    data() {
        return {
            shouldShowForm: false,
            add_style_name: '',
            add_style_element: '',
            add_style_class: '',
        }
    },
    emits: [ 'createNewStyle' ],
    methods: {
        createNewStyle() {
            if (
                this.add_style_name !== "" &&
                this.add_style_element !== ""
            ) {
                this.$emit('createNewStyle', {
                    name: this.add_style_name,
                    element: this.add_style_element,
                    cl: this.add_style_class
                });
            } else {
                // TODO: Handle error inputs.
            }
        },
        debug(msg) {
            console.log(msg);
        }
    }
}
</script>