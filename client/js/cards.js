Vue.component('card', {
  props: ['entry'],
  template: `<section class="card-container color-1">
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
                                    <span class="value-part">+{{entry.fort}}</span>
                                    <span class="value-part">+{{entry.reflex}}</span>
                                    <span class="value-part">+{{entry.will}}</span>
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
                                <td class="value">+{{entry.initiative_bonus}}</td>
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
        </section>`
})


var app = new Vue({
	el : '#app',
	data : {
		showform : true,
		showcards : false,
		source : '[\n  {\n    "name": "Goblin",\n    "base": "Small Humanoid",\n    "hp": "5",\n    "current_hp": "5",\n    "ac": "15",\n    "initiative_bonus": "1",\n    "attack_parameters": "club +2/d6",\n    "str": "11",\n    "dex": "13",\n    "con": "12",\n    "int": "10",\n    "wis": "9",\n    "cha": "6",\n    "fort": "3",\n    "reflex": "1",\n    "will": "-1",\n    "speed": "30",\n    "cr": "⅓",\n    "img": "http://www.wizards.com/dnd/images/MM35_gallery/MM35_PG133.jpg",\n    "notes": "Hide +5, Listen +2, Move Silently +5, Ride +4, Spot +2"\n  }\n]'
	},
	methods : {
		showCards : function() {
			this.cards = JSON.parse(this.source)
			this.showform = false
			this.showcards = true
		},
		showForms : function() {
			this.showform = true
			this.showcards = false
		}
	}
});
