const pokemon = require('pokemon');

//console.log(pokemon.all());
//=> ['Bulbasaur', …]
for (let i = 0; i < 50; i++) {
    console.log(pokemon.random());
}
console.log(pokemon.random());
//=> 'Snorlax'

console.log(pokemon.getName(2));
//=> 'Dratini'

console.log(pokemon.getId('Pikachu'));
//=> 147