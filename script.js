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

const goblin = {
  name: "Гоблин",
  health: 30,
  attack: 10, 
  quantity: 1
};

const  orc = {
  name: "Орк",
  health: 50,
  attack: 20, 
  quantity: 1
};

const dragon = {
  name: "Дракон",
  health: 75,
  attack: 35, 
  quantity: 1
};

const enemies = [goblin, orc, dragon]

const messages = {
  enemysAttack: (enemyName) => `${enemyName} атаковал вас. У рыцаря осталось ${Math.max(knight.health, 0)} единиц здоровья. У ${enemyName} осталось ${Math.max(enemy.health, 0)} здоровья.`,
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
  gameField.innerHTML += `${text}<br>`;
  gameField.scrollTop = gameField.scrollHeight;
}
//блокировка кнопок
function disableButton(buttons) {
  buttons.forEach(btn => btn.disabled = true);
}
//активация кнопок
function enableButton(buttons) {
  buttons.forEach(btn => btn.disabled = false);
}
//обновление рыцаря
function resetKnight() {
  knight.health = 100;
  knight.attack = 20;
  knight.protection = 30;
  knight.inventory = {
    healthPotion: 1,
    attackPotion: 1, 
    shield: 1
  }
}

//отключение всех кнопок кроме старта на начало игры
disableButton([...locationsBtn, ...actionsBtn]);

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
    alert('Вы погибли. Начните игру заново, нажав старт.')

    //отключение кнопок локации, действий
    disableButton([...locationsBtn, ...actionsBtn]);
    //активация кнопки старта
    startBtn.disabled = false;
  }
  showCharact(knight);
}

function startGame() {
  gameField.innerHTML = ' ';
  // отключение кнопки старта
  startBtn.disabled = true; 
  
  //активация кнопок локации
  enableButton(locationsBtn);
  castleBtn.disabled = true;
  inventBtn.disabled = false;
 

  printText('Добро пожаловать в игру! Вы находитесь в замке. Выбирайте куда отправиться и удачного приключения!')
  currentLocation = 'castle';
  locationTitle.innerHTML = `Сейчас рыцарь в замке`
  resetKnight();
  
  showCharact(knight);
}

function changeLocation(location, locationName, someEnemy){
  startBtn.disabled = false;
  currentLocation = location;
  locationTitle.innerHTML = `Сейчас рыцарь ${locationName}`
  showCharact(knight);
  if (someEnemy) {
    enemy = { name: someEnemy.name, health: someEnemy.health, attack: someEnemy.attack}
    printText(`Вы ${locationName} и повстречали ${enemy.name}.
      У него ${enemy.health} единиц здоровья!`)
    printText('Атакуйте или защищайтесь.')  
    
  } else {
    printText('Вы сейчас в замке.');
    enemy = null;
  }
}

castleBtn.onclick = function() { 
  enableButton(locationsBtn)
  disableButton(actionsBtn)
  inventBtn.disabled = false;
  castleBtn.disabled = true;
  changeLocation('castle', 'в замке')
}
forestBtn.onclick = function() { 
  enableButton([...locationsBtn, ...actionsBtn])
  forestBtn.disabled = true;
  changeLocation('forest', 'в лесу', goblin)
}

bridgeBtn.onclick = function() { 
  enableButton([...locationsBtn, ...actionsBtn])
  bridgeBtn.disabled = true;
  changeLocation('bridge','у моста', orc)
}

caveBtn.onclick = function() { 
  enableButton([...locationsBtn, ...actionsBtn])
  caveBtn.disabled = true;
  changeLocation('cave', 'в пещере', dragon)
}

function knightsAttack() {
  if (!enemy) return;

  //Атака рыцаря
  enemy.health -= knight.attack;
  printText(`Вы атаковали ${enemy.name}. У него осталось ${Math.max(enemy.health, 0)} единиц здоровья.`);
  
  //Проверка: враг побежден
  if (enemy.health <= 0) {
    printText(`Рыцарь победил ${enemy.name}. Выбирайте куда идти дальше!`);
    alert('Вы победили! Выберите следующую локацию!')
    
    //активация кнопок локации, блокировка действий
    enableButton(locationsBtn);
    disableButton(actionsBtn);
    inventBtn.disabled = false;

    enemy = null; //удаляем врага
    showCharact(knight);
    return;
  }

  //Атака врага
  knight.health -= enemy.attack;
  printText(messages.enemysAttack(enemy.name));

  //Проверка: рыцарь погиб
  khightDeath(knight)
}

attackBtn.onclick = knightsAttack;

function knightsProtect() {
  if (!enemy) return;
  printText(`Вы защищаетесь! Ваша защита составляет ${knight.protection} единиц.`);
  showCharact(knight);
  knight.health -= Math.max(0, enemy.attack - knight.protection);
  enemy.health -= 5
  printText(messages.enemysAttack(enemy.name));
  showCharact(knight);

  //Проверка: враг побежден
  if (enemy.health <= 0) {
    printText(`Рыцарь победил ${enemy.name}. Выбирайте куда идти дальше!`);
    alert('Вы победили! Выберите следующую локацию!')
    
    //активация кнопок локации, блокировка действий
    enableButton(locationsBtn);
    disableButton(actionsBtn);
    inventBtn.disabled = false;

    enemy = null; //удаляем врага
    showCharact(knight);
    return;
  }
    //Проверка: рыцарь погиб
  khightDeath(knight);
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
      knight.attack += 15;
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

