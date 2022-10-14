const games = []
const system = "876543210"
let kursiv = '000000000'
let chi = 0
let index =-1
let i = 0
    let arr = []
    for(let a = 0; a<=8; a++){
        for(let b = 0; b<=7; b++){
            for(let c = 0; c<=6; c++){
                for(let d = 0; d<=5; d++){
                    for(let e = 0; e<=4; e++){
                        for(let f = 0; f<=3; f++){
                            for(let g = 0; g<=2; g++){
                                for(let h = 0; h<=1; h++){
                                    arr[i]=`${a}${b}${c}${d}${e}${f}${g}${h}0`
                                 i++   
                                }
                            }
                        }
                    }
                }
            }   
        }
    }
// function sanoqSistemasi() 
function play(){
    index++
    const canvas = document.querySelector('canvas');
    let str = ''
    let inc = 0
const table = document.querySelector('table');
const c = canvas.getContext("2d");
let winner
const player = 1
    let game = {
        turn : 1,
        notation: [],
        variant: ['a1', 'b1', 'c1','a2', 'b2', 'c2','a3', 'b3', 'c3'],
        tugadi: false,
        yurish: 0
    }
class Tile{
    constructor({position, kordinata, index}){
        this.position = position
        this.kordinata = kordinata
        this.index = index
    }
    draw(color){
        let div = document.createElement("div")
        div.classList.add('tile');
        div.style.width = canvas.width/3 +'px'
        div.style.height = canvas.height/3+'px'
        div.style.left = this.position.x+'px'
        div.style.top = this.position.y+'px'
        div.id = this.kordinata
        table.appendChild(div)
        this.element = div
        c.beginPath()
        c.fillStyle = color || 'rgba(0,0,250, .2)'
        c.fillRect(this.position.x, this.position.y, canvas.width/3, canvas.height/3)
        c.fill()
        c.closePath()
    }
}
let l = console.log

const tableMap = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
]
game.map = tableMap
let tiles = []
tableMap.forEach((row, i)=>{
    row.forEach((col, j)=>{
        let columnIndex = 'abc'
        let rowIndex = '321'
        let kordinata = columnIndex[j]+rowIndex[i]
        let tile = new Tile({position: {
            x: canvas.width /3* j ,
            y: canvas.height /3 * i
        }, kordinata, index: [j,i]})
        // tile.draw()
        tiles.push(tile)
    })
})
function move(kordinata){
    if(!game.tugadi){
        
    let arr = []
    game.variant.forEach(v =>{
        if(v!=kordinata){
            arr.push(v)
        }
    })
    game.variant = arr
    if(game.turn==1){
        game.notation.push([kordinata])
    }else{
        game.notation[game.notation.length-1].push(kordinata)
    }
    let place = fromKordinata(kordinata);
    game.map[place[1]][place[0]] = game.turn
    let currentTile
    tiles.forEach(tile => {
        if(tile.kordinata == kordinata){
            currentTile = tile
        }
    })
    //DRAW Current tile color
    // if(game.turn ==1){
    //     currentTile.draw('#7788ff')
    // }else{
    //     currentTile.draw("red")
    // }
    if(isGameOver()){
        // alert("GAME OVER")
        game.tugadi=true
    }
    changeTurn()
    // if(game.turn == 2){
        moveRandom()
    // }
    }
}moveRandom()
function changeTurn(){
    if(game.turn == 1){
        game.turn = 2
    }else{
        game.turn = 1
    }
}
function fromKordinata(kor){
    let columnIndex = 'abc'
    let rowIndex = '321'
    let res = []
    for(let i = 0; i<3;i++){
        if(columnIndex[i]==kor[0]){
            res[0]= i
        }
        if(rowIndex[i]==kor[1]){
            res[1] = i
        }
    }
    return res
}

// click rules
const tilesDocument = document.querySelectorAll('.tile');
tilesDocument.forEach(tile => {
    tile.onclick = () => {
        // if(player == game.turn){
            move(tile.id)
        
        // }
    }
})
function compareArr(a,b){
    for(let i = 0; i<a.length; i++){
        for(let j = 0; j<a[i].length; j++){
            if(a[i][j] !== b[i][j]){
                return false
            }
        }
    }
}
    return true
function moveRandom(){
    // let rand = Math.floor(Math.random()*(game.variant.length-1))
    // let rand = inc
    rand = arr[index][inc]
    str =str+game.variant[0]
    inc++
    // games.forEach(g => {
    //     if(g.notationStr == str){
    //         inc++
    //         moveRandom()
    //     }
    // })
    game.yurish++
    // if(takror[o] && game.yurish == lastmove){
    //     inc++
    //     moveRandom()
    // }
    // inc=0
    move(game.variant[rand])
}
function isBingo(){
    function compare(a,s,d){
        if(a==s && s==d && d !==' ') return true
        else return false
    }
    function mapC(a,s,d){
        return compare(game.map[a[0]][a[1]], game.map[s[0]][s[1]], game.map[d[0]][d[1]])
    }
    if(
        mapC([0,0], [0,1], [0,2])||
        mapC([1,0], [1,1], [1,2])||
        mapC([2,0], [2,1], [2,2])||
        mapC([0,0], [1,0], [2,0])||
        mapC([0,1], [1,1], [2,1])||
        mapC([0,2], [1,2], [2,2])||
        mapC([0,0], [1,1], [2,2])||
        mapC([2,0], [1,1], [0,2])
    ){
        winner = game.turn
        return true
    }
}
function isGameOver(){
    let gameResult = {winner: null, notation: game.notation, lastPosition: game.map, notationStr: ''}
    if(isBingo() || game.notation.length ==5 ){
    game.notation.forEach(r => r.forEach(c=> {
        gameResult.notationStr+=c
    }))
        if(winner){
            // alert(`Player ${winner} win`)
            gameResult.winner = winner
        }else{
            // alert("It's draw")
        }
        let topildi
        games.forEach(g => {
            if(g.notationStr == gameResult.notationStr){
                // play()
                topildi = true
            }
        })
        // 000
        // 000
        // 111
        // 987654321
        // l({gameResult}) 
        if(!topildi){
            games.push(gameResult)
        }else{

        }
        return true
    }
    else return false
}
}
for (let index = 0; index < 362880; index++) {
    play()
}
console.log(games)