const pers = {
    name: 'alert',
    age: 12,
    
    get userAge() {
        return this.age; // Получение возраста
    },
    set userAge(num) {
        this.age = num; //Присвоение возроста
    }
};

console.log(pers.userAge);
console.log(pers.userAge = 30);