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

		map: {
			default: null,
			type: cc.TiledMap,
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
		this.tiledMap = this.node.getComponent(cc.TiledMap);
		var player = this.node.getChildByName('player');
		var playerPos = cc.p(player.x, player.y);
		this.playerTile = this.getTilePos(playerPos);



		// let playerObj = this.node.getChildByName('player');

		// let playerPos = cc.p(playerObj.offset.x, playerObj.offset.y);
		// this.playerTile = this.getTilePosition(playerPos);
		// var newTile = cc.p(this.playerTile.x, this.playerTile.y);
	},

	//将像素坐标转化为瓦片坐标
	getTilePos: function(posInPixel) {
		cc.log('getTilePos() : ' + posInPixel);
		var mapSize = this.node.getContentSize();
		var tileSize = this.tiledMap.getTileSize();
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
		var mapSize = this.tiledMap.getMapSize();
		cc.log(mapSize);
		if (newTile.x < 0 || newTile.x >= mapSize.width) return;
		if (newTile.y < 0 || newTile.y >= mapSize.height) return;

		// if (this.barriers.getTileGIDAt(newTile)) { //GID=0,则该Tile为空
		// 	cc.log('This way is blocked!');
		// 	return false;
		// }

		this.playerTile = newTile;
		cc.log(this.playerTile);
		// this.updatePlayerPos();

		this.player.setPosition(this.playerTile);
	},

	start() {

	},

	// update (dt) {},
});