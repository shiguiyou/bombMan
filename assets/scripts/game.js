// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
	extends: cc.Component,

	properties: {
		//sfsdfsdfsdfsdf
		map: {
			default: null,
			type: cc.TiledMap,
		},

		b1: {
			default: null,
			type: cc.TiledLayer,
		},

		b2: {
			default: null,
			type: cc.TiledLayer,
		},

		player: {
			default: null,
			type: cc.Node,
		},

	},

	// LIFE-CYCLE CALLBACKS:

	onLoad() {

		this.loadMap();
	},

	loadMap() {

		var playerPos = cc.p(this.player.x, this.player.y);
		this.playerTile = this.getTilePos(playerPos);
		// var newTile = cc.p(this.playerTile.x, this.playerTile.y);
	},

	//将像素坐标转化为瓦片坐标
	getTilePos: function(posInPixel) {
		cc.log('getTilePos() : ' + posInPixel);
		var mapSize = this.node.getContentSize();
		var tileSize = this.map.getTileSize();
		var x = Math.floor(posInPixel.x / tileSize.width);
		var y = Math.floor((mapSize.height - posInPixel.y) / tileSize.height);
		return cc.p(x, y);
	},

	btnBomb() {

	},

	btnUp() {
		let newTile = cc.p(this.playerTile.x, this.playerTile.y);
		newTile.y -= 1;
		this.tryMoveToNewTile(newTile);
	},

	btnDown() {
		let newTile = cc.p(this.playerTile.x, this.playerTile.y);
		newTile.y += 1;
		this.tryMoveToNewTile(newTile);
	},

	btnLeft() {
		let newTile = cc.p(this.playerTile.x, this.playerTile.y);
		newTile.x -= 1;
		this.tryMoveToNewTile(newTile);
	},

	btnRight() {
		let newTile = cc.p(this.playerTile.x, this.playerTile.y);
		newTile.x += 1;
		this.tryMoveToNewTile(newTile);
	},

	tryMoveToNewTile: function(newTile) {
		//15*15的大小
		var mapSize = this.map.getMapSize();
		if (newTile.x < 0 || newTile.x >= mapSize.width) return;
		if (newTile.y < 0 || newTile.y >= mapSize.height) return;

		if (this.b1.getTileGIDAt(newTile)) { //GID=0,则该Tile为空
			cc.log('This way is blocked!');
			return false;
		}

		if (this.b2.getTileGIDAt(newTile)) { //GID=0,则该Tile为空
			cc.log('This way is blocked!');
			return false;
		}

		this.playerTile = newTile;
		cc.log(this.playerTile);
		// this.updatePlayerPos();

		var pos = this.b1.getPositionAt(this.playerTile);
		this.player.setPosition(pos);
	},

	start() {

	},

	// update (dt) {},
});