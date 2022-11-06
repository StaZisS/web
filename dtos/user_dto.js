module.exports = class UserDto{
    email;
    id;
    is_active;
    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.is_active = model.is_active;
    }
}