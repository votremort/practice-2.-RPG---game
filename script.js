const knight = {
  name: 'Рыцарь',
  health: 100,
  attack: 15,
  protection: 50,
  level: 0,
  inventory: ''
}
const goblin = {
  name: 'Гоблин',
  health: 40,
  attack: 5,
}
const orc = {
  name: 'Орк',
  health: 60,
  attack: 10,
}
const dragon = {
  name: 'Дракон',
  health: 90,
  attack: 20,
}
const healthPotion = {
  health: 20,
  attack: 5,
  protection: 5,
}
const attackPotion = {
  health: 5,
  attack: 15,
  protection: 5,
}
const protectionPotion = {
  health: 5,
  attack: 5,
  protection: 20,
}
const shield = {
  protection: 30
}

const enemies = [goblin, orc, dragon]
const inventory = [healthPotion, attackPotion, protectionPotion, shield]

const gameField = document.getElementById('gameField');
const startBtn = document.getElementById('startButton');
const lineBreak = document.createElement('br')

function knightAttack(knight, enemy) {
  gameField.textContent = `${knight.name} атакует ${enemy.name}. `;
  enemy.health -= knight.attack;
  const textAttack = `${enemy.name} получил ${knight.attack} урона. 
  У ${enemy.name} осталось ${enemy.health} единиц здоровья`;
  gameField.appendChild(lineBreak);
  gameField.appendChild(document.createTextNode(textAttack))
}

function enemyAttack(knight, enemy) {
  const startAttackText = `${enemy.name} атакует ${knight.name}!`
  gameField.appendChild(lineBreak);
  gameField.appendChild(document.createTextNode(startAttackText));
  knight.health -= enemy.attack;
  const textAttack = `${knight.name} получил ${enemy.attack} урона. 
  У ${knight.name} осталось ${knight.health} единиц здоровья.`;
  gameField.appendChild(lineBreak);
  gameField.appendChild(document.createTextNode(textAttack));
}

startBtn.addEventListener('click', function(){
  enemyAttack(knight, orc)
});
