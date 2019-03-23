 Vue.component('input-number', {
     name: 'input-number',
     template: '<div class="input-number">\
           <input :value="currentValue" @change="changed" >           \
        <button @click="add">+</button>\
        <button @click="minus">-</button></div>',
     props: {
         max: {
             type: Number,
             default: Infinity
         },
         min: {
             type: Number,
             default: -Infinity
         },
         value: {
             type: Number,
             default: 0
         },
         step: {
             type: Number,
             default: 10
         }
     },
     data: function() {
         return {
             currentValue: this.value
         }
     },
     watch: {
         value(value) {
             this.updateValue(value)
         },
         currentValue(value) {
             this.$emit('input', value)
             this.$emit('on-change', value)
         }
     },
     methods: {
         changed(event) {
             console.log(event)
             var val = event.target.value.trim()
             console.log(val)
             if (this.isNumber(val)) {
                 val = Number(val)
                 this.currentValue = val
                 if (val >= this.max) {
                     this.currentValue = this.max
                 } else if (val <= this.min) {
                     this.currentValue = this.min
                 }
             } else {
                 event.target.value = this.currentValue
             }

         },

         updateValue(value) {
             if (value >= this.max) {
                 this.currentValue = this.max
             } else if (value <= this.min) {
                 this.currentValue = this.min
             } else {
                 this.currentValue = value
             }
         },
         add() {
             this.currentValue = this.currentValue + this.step
             console.log(this.currentValue)
         },
         minus() {
             this.currentValue = this.currentValue - this.step
             console.log(this.currentValue)
         },
         isNumber(value) {
             return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '')
         }
     }
 })