class Pers{
    constructor(name, age) {
        this.name = name,
        this._age = age;
    }
    
    surname = 'Sergeev';

    get sure() {
        return this._surname;
    }

    set sure(surname) {
        this._surname = surname;
    }


    say = () => {
        console.log(`Имя человека: ${this.name} ${this.surname} возрост: ${this._age}.`)
    }
    
    get age() {
        return this._age;
    }
    
    set age(age) {
        if(age > 0 && age < 100 && typeof age === 'number'){
            this._age = age;
        } else {
            
            console.log('Не корректный возраст.')
        }
    }
};

const al = new Pers('al', 23);
// console.log(al.surname);
// al.age = 88;
// console.log(al.age);
al.say();

al.surname = 'Бобков';

al.say();



