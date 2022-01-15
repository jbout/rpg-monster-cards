Vue.component('card', {
  props: ['entry'],
	mounted() {
		this.$root.$on('updatecard', (card, jsonstring) => {
			if (this === card) {
				this.saveme(jsonstring)
			}
		})
	},
  template: `<section class="card-container color-1" v-on:click="editme" v-on:updatecard="saveme">
            <div class="recto decorated-container">
                <div class="antlitz-outer">
                    <img class="antlitz" :src="entry.img" alt="" />
                </div>
                <div class="frame">
                    <img src="img/frame.png">
                    <h2 class="badge-bottom">{{entry.name}}</h2>
                </div>
            </div>
            <div class="verso decorated-container">
                <div class="frame">
                    <img src="img/frame.png">
                    <h2 class="badge-top">{{entry.name}}</h2>
                </div>
                <div class="card-properties-outer">
                    <table class="card-properties">
                        <colgroup>
                            <col width="25%">
                            <col width="25%">
                            <col width="25%">
                            <col width="25%">
                        </colgroup>
                        <tbody>
                            <tr>
                                <td>AC</td>
                                <td class="value">{{entry.ac}}</td>
                                <td>HP</td>
                                <td class="value">{{entry.hp}}</td>
                            </tr>
                            <tr>
                                <td>Attack</td>
                                <td colspan="3" class="value">{{entry.attack_parameters}}</td>
                            </tr>
                            <tr>
                                <td>Saves</td>
                                <td colspan="3" class="value">
                                    <span class="value-part">{{entry.fort}}</span>
                                    <span class="value-part">{{entry.reflex}}</span>
                                    <span class="value-part">{{entry.will}}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Stats</td>
                                <td colspan="3" class="value">
                                	<span class="value-part">{{entry.str}}</span>
                                    <span class="value-part">{{entry.dex}}</span>
                                    <span class="value-part">{{entry.con}}</span>
                                    <span class="value-part">{{entry.int}}</span>
                                    <span class="value-part">{{entry.wis}}</span>
                                    <span class="value-part">{{entry.cha}}</span>
                                </td>
                            </tr>
                            <tr class="pre-ultimate">
                                <td>Init</td>
                                <td class="value">{{entry.ini}}</td>
                                <td>Speed</td>
                                <td class="value">{{entry.speed}}
                                    feet</td>
                            </tr>
                            <tr>
                                <td colspan="4" class="long-text">{{entry.notes}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="badge-cr">{{entry.cr}}</div>
                </div>
            </div>
        </section>`,
	methods:{
      editme : function() {
		this.$root.$emit('edit-intend', this)
      },
      saveme : function(jsonstring) {
			console.log("saved")
			this.entry = JSON.parse(jsonstring)
      }
   }
})

MonsterLibrary = Vue.component('MonsterLibrary', {
	data: function () {
		return {
			data : []
		}
	},
	mounted () {
	  $.getJSON('monsters.json', json => {
		this.data = json
	  })
	},
  	template: `<div  style="float: left; margin: 20px;" class="monster-list">
  				<h3>Monster Library</h3>
  				<select @change="changeSort($event)">
  					<option value="name">Alphabetically</option>
  					<option value="cr">By Challenge Rating</option>
<!--				<option value="env">By Environment</option> -->
  				</select>
  				<ul>
                <monster v-for="monsterdata in data" v-bind:monsterdata="monsterdata" v-on:addmonster = "propagate"/>
  				</ul>
               </div>`,
	methods: {
		propagate : function(monster) {
	        this.$emit('addmonster', monster)
		},
		changeSort : function(event) {
	        sortby = event.srcElement.value
			this.data.sort(function(a, b){
			if (a[sortby] < b[sortby]) {
				return -1;
			}
			if (a[sortby] > b[sortby]) {
				return 1;
			}
			return 0;
			});
		}
	},
	components : {
		'monster' : {
			props: ['monsterdata'],
			template: `<li><button v-on:click="addCard">{{monsterdata.name}}</button> <span class="challenge-rating">{{monsterdata.cr}}</span></li>`,
			methods: {
				addCard : function(card) {
			        this.$emit('addmonster', this.monsterdata)
				}
			},
		},
	}
})

CardEditor = CardEditor = Vue.component('CardEditor', {
	data: function () {
		return {
			raw: '',
			card: null
		}
	},
	mounted() {
		this.$root.$on('edit-intend', (monster) => {this.loadcard(monster)})
	},
	template: `<div style="float: right; margin: 20px;" v-if="raw" class="monster-editor">
              <h1>edit</h1>
	      <textarea name="raw_textarea" rows="20" cols="40" v-model="raw"></textarea>
	      <br>
              <button width="100%" v-on:click="savecard">save</button>
            </div>`,
	methods:{
		loadcard : function(card) {
			console.log("edit called")
			this.card = card
			this.raw = JSON.stringify(card.entry, null, 2)
		},
		savecard : function(card) {
			console.log("save called")
			this.$root.$emit('updatecard', this.card, this.raw)
			this.raw = ''
			this.card = null
		}
	}
})

var app = new Vue({
	el : '#app',
	data : {
		cards: [],
	},
	methods : {
		addCard : function(card) {
			this.cards.push(card)
		},
	},
	components : {
		'monsterlibrary' : MonsterLibrary,
		'cardeditor' : CardEditor
	}
});
