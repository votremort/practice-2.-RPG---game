const knight = {
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

const messages = {
  enemysAttack: (enemyName) => `${enemy.name} атаковал вас. У рыцаря осталось ${Math.max(knight.health, 0)} единиц здоровья. У ${enemy.name} осталось ${Math.max(enemy.health, 0)} здоровья.`,
  loss: 'Вы погибли. Игра окончена'
}

let currentLocation = 'castle';
let enemy = null;


const gameField = document.getElementById('gameField');
const charactText = document.getElementById('charactText');
const locationTitle = document.getElementById('locationTitle');

const castleBtn = document.getElementById('castleBtn');
const forestBtn = document.getElementById('forestBtn');
const bridgeBtn = document.getElementById('bridgeBtn');
const caveBtn = document.getElementById('caveBtn');

const locationsBtn = [castleBtn, forestBtn, bridgeBtn, caveBtn]

const attackBtn = document.getElementById('attackBtn');
const protectBtn = document.getElementById('protectBtn');
const inventBtn = document.getElementById('inventBtn');

const actionsBtn = [attackBtn, protectBtn, inventBtn];

const startBtn = document.getElementById('startBtn');
startBtn.onclick = startGame;


//вспомогательные функции
function printText(text) {
  gameField.innerHTML += `${text}<br>`
}

function showCharact(knight) {
  let info = `
    <p class='charactString'>Здоровье: ${Math.max(knight.health, 0)}</p>
    <p class='charactString'>Атака: ${knight.attack}</p>
    <p class='charactString'>Защита: ${knight.protection}</p>
    <ul class='charactInvent'> Инвентарь:
      <li>Зелье здоровья: ${knight.inventory.healthPotion}</li>
      <li>Зелье силы: ${knight.inventory.attackPotion}</li>
      <li>Щит: ${knight.inventory.shield}</li>
    </ul>
  `
  charactText.innerHTML = info;
}
showCharact(knight);

function khightDeath(knight) {
  if (knight.health <= 0) {
    printText(messages.loss);

    //отключение кнопок локации
    locationsBtn.forEach(btn => btn.disabled = true); 
    //отключение кнопок действий
    actionsBtn.forEach(btn => btn.disabled = true);
    //активация кнопки старта
    startBtn.disabled = false;
  }
}

function startGame() {
  gameField.innerHTML = ' ';
  // отключение кнопки после нажатия на нее
  startBtn.disabled = true; 
  //активация кнопок локации
  locationsBtn.forEach(btn => btn.disabled = false);
  //активация кнопок действий
  actionsBtn.forEach(btn => btn.disabled = false);

  printText('Добро пожаловать в игру! Вы находитесь в замке. Выбирайте куда отправиться и удачного приключения!')
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
  //отключение  кнопок локации
  locationsBtn.forEach(btn => btn.disabled = true); 

  currentLocation = location;
  locationTitle.innerHTML = `Сейчас рыцарь ${locationName}`
  showCharact(knight);
  if (enemyName) {
    enemy = { name: enemyName, health: enemyHealth, attack: enemyAttack}
    printText(`Вы ${locationName} и повстречали ${enemyName}.
      У него ${enemyHealth} единиц здоровья!`)
    printText('Атакуйте или защищайтесь.')  
    
  } else {
    printText('Вы сейчас в замке.');
    enemy = null;
  }
}

castleBtn.onclick = function() { 
  changeLocation('castle', 'в замке')
}
forestBtn.onclick = function() { 
  forestBtn.disabled = true;
  changeLocation('forest', 'в лесу', 'Гоблин', 30, 10)
}

bridgeBtn.onclick = function() { 
  bridgeBtn.disabled = true;
  changeLocation('bridge','у моста', 'Орк', 50, 20)
}

caveBtn.onclick = function() { 
  caveBtn.disabled = true;
  changeLocation('cave', 'в пещере', 'Дракон', 90, 40)
}

function knightsAttack() {
  if (!enemy) return;

  //Атака рыцаря
  enemy.health -= knight.attack;
  printText(`Вы атаковали ${enemy.name}. У него осталось ${Math.max(enemy.health, 0)} единиц здоровья.`);
  
  //Проверка: враг побежден
  if (enemy.health <= 0) {
    printText(`Рыцарь победил ${enemy.name}. Выбирайте куда идти дальше!`);
    
    //активация кнопок локации
    locationsBtn.forEach(btn => btn.disabled = false); 

    enemy = null; //удаляем врага
    showCharact(knight);
    return;
  }

  //Атака врага
  knight.health -= enemy.attack;
  printText(messages.enemysAttack(enemy.name));

  //Проверка: рыцарь погиб
  khightDeath(knight)
  // if (knight.health <= 0) {
  //   printText(messages.loss);

  //   //отключение кнопок локации
  //   locationsBtn.forEach(btn => btn.disabled = true); 

  //   startBtn.disabled = false;
  // }

  showCharact(knight);
}

attackBtn.onclick = knightsAttack;

function knightsProtect() {
  printText(`Вы защищаетесь! Ваша защита составляет ${knight.protection} единиц.`);
  showCharact(knight);
  knight.health -= Math.max(0, enemy.attack - knight.protection);
  enemy.health -= 5
  printText(messages.enemysAttack(enemy.name));
  showCharact(knight);
  if (knight.health <= 0) {
    printText(messages.loss);

    //отключение кнопок локации
    locationsBtn.forEach(btn => btn.disabled = true); 
    startBtn.disabled = false;

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
      printText(`Вы использовали зелье здоровья. 
        Ваше здоровье теперь составляет ${knight.health} единиц.`);
    } else if (item === 'зелье силы' && knight.inventory.attackPotion > 0) {
      knight.attack += 5;
      knight.inventory.attackPotion--;
      showCharact(knight);
      printText(`Вы использовали зелье силы. 
        Теперь ваша сила атаки составляет ${knight.attack} единиц.`)
    } else if (item === 'щит' && knight.inventory.shield > 0) {
      knight.protection += 10;
      knight.inventory.shield--;
      showCharact(knight);
      printText(`Вы использовали щит. 
        Ваша защита теперь составляет ${knight.protection} единиц.`);
    } else {
      printText('Вы ввели неверный предмет или предмет закончился!')
    }
}

