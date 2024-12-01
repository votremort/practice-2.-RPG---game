let knight = {
  name: 'Рыцарь',
  health: 100,
  attack: 20,
  protection: 30,
  inventory: {
    healthPotion: 1,
    attackPotion: 1, 
    shield: 1
  },
};

let currentLocation = 'castle';
let enemy = null;


const gameField = document.getElementById('gameField');
const charactText = document.getElementById('charactText');
const locationTitle = document.getElementById('locationTitle');

const castleBtn = document.getElementById('castleBtn');
const forestBtn = document.getElementById('forestBtn');
const bridgeBtn = document.getElementById('bridgeBtn');
const caveBtn = document.getElementById('caveBtn');

const attackBtn = document.getElementById('attackBtn');
const protectBtn = document.getElementById('protectBtn');
const inventBtn = document.getElementById('inventBtn');


const startBtn = document.getElementById('startBtn');
startBtn.onclick = startGame;

const restartBtn = document.getElementById('restartBtn');
restartBtn.onclick = startGame;

// const lineBreak = document.createElement('br')
function printText(text) {
  // gameField.appendChild(lineBreak);
  const textMessage = text
  return gameField.appendChild(document.createTextNode(textMessage));
}

function showCharact(knight) {
  let info = `
    <p class='charactString'>Здоровье: ${knight.health}</p>
    <p class='charactString'>Атака: ${knight.attack}</p>
    <p class='charactString'>Защита: ${knight.protection}</p>
    <ul class='charactInvent'> Инвентарь:
      <li>Зелье здоровья: ${knight.inventory.healthPotion}</li>
      <li>Зелье атаки: ${knight.inventory.attackPotion}</li>
      <li>Щит: ${knight.inventory.shield}</li>
    </ul>
  `
  charactText.innerHTML = info;
}
showCharact(knight);

function startGame() {
  printText('\nДобро пожаловать в игру! Вы находитесь в замке. Выбирайте куда отправиться и удачного приключения!')
  currentLocation = 'castle';
  knight = {
    health: 100,
    attack: 20,
    protection: 30,
    inventory: { healthPotion: 1, attackPotion: 1,  shield: 1 },
  }
  showCharact(knight);
}

function changeLocation(location, locationName, enemyName, enemyHealth, enemyAttack){
  currentLocation = location;
  locationTitle.innerHTML = `Сейчас рыцарь ${locationName}`
  showCharact(knight);
  if (enemyName) {
    enemy = { name: enemyName, health: enemyHealth, attack: enemyAttack}
    printText(`\nВы попали в ${location} и повстречали ${enemyName}.
      У него ${enemyHealth} единиц здоровья!`)
    printText('\nАтакуйте или защищайтесь.')  
    
  } else {
    printText('Вы сейчас в замке.');
    enemy = null;
  }
}

castleBtn.onclick = function() { 
  changeLocation('castle', 'в замке')
}
forestBtn.onclick = function() { 
  changeLocation('forest', 'в лесу', 'Гоблин', 30, 10)
}

bridgeBtn.onclick = function() { 
  changeLocation('bridge','у моста', 'Орк', 50, 20)
}

caveBtn.onclick = function() { 
  changeLocation('cave', 'в пещере', 'Дракон', 90, 40)
}

function knightsAttack() {
  if (enemy) {
    enemy.health -= knight.attack;
    printText(`\nВы атаковали ${enemy.name}. У него осталось ${enemy.health} единиц здоровья.`);
    
    if (enemy.health <= 0) {
      printText(`\nРыцарь победил ${enemy.name}. Выбирайте куда идти дальше!`);
      enemy = null;
      showCharact(knight);
    } else {
      knight.health -= enemy.attack;
      printText(`\n${enemy.name} атаковал вас. У вас осталось ${knight.health} единиц здоровья.`);
      showCharact(knight);
      
      if (knight.health <= 0) {
        printText('\nВы погибли. Игра окончена');
        showCharact(knight);
      }
    }
  }
}

attackBtn.onclick = knightsAttack;

function knightsProtect() {
  printText(`\nВы защищаетесь! Ваша защита составляет ${knight.protection} единиц.`);
  showCharact(knight);
  knight.health -= Math.max(0, enemy.attack - knight.protection);
  enemy.health -= 5
  printText(`\n${enemy.name} атаковал вас. У рыцаря осталось ${knight.health} единиц здоровья. У ${enemy.name} осталось ${enemy.health} здоровья.`);
  showCharact(knight);
  if (knight.health <= 0) {
    printText('\nВы погибли. Игра окончена');
    showCharact(knight);
  }
}

protectBtn.onclick = knightsProtect;

inventBtn.onclick = function() {
  const item = prompt('Введите название инвентаря (зелье здоровья, зелье силы или щит):').toLowerCase();
  useItem(item);
}

function useItem(item) {
    if (item === 'зелье здоровья' && knight.inventory.healthPotion > 0) {
      knight.health += 20;
      knight.inventory.healthPotion--;
      showCharact(knight);
      printText(`\nВы использовали зелье здоровья. 
        Ваше здоровье теперь составляет ${knight.health} единиц.`);
    } else if (item === 'зелье силы' && knight.inventory.attackPotion > 0) {
      knight.attack += 5;
      knight.inventory.attackPotion--;
      showCharact(knight);
      printText(`\nВы использовали зелье силы. 
        Теперь ваша сила атаки составляет ${knight.attack} единиц.`)
    } else if (item === 'щит' && knight.inventory.shield > 0) {
      knight.protection += 10;
      knight.inventory.shield--;
      showCharact(knight);
      printText(`\nВы использовали щит. 
        Ваша защита теперь составляет ${knight.protection} единиц.`);
    } else {
      printText('\nВы ввели неверный предмет или предмет закончился!')
    }
}

