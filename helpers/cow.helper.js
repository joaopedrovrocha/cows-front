import moment from "../lib/moment"

export function getBirthMonth(birthMonth) {
    return moment(birthMonth, 'YYYY-MM').format('MM/YYYY')
}

export function getAge(birthMonth) {
    return moment(birthMonth, 'YYYY-MM').fromNow(true)
}

export function parseBirthMonthToDatabase(birthMonth) {
    return birthMonth.split('/').reverse().join('-')
}

export function parseBirthMonthToView(birthMonth) {
    return birthMonth.split('-').reverse().join('/')
}

export function getGender(gender) {
    const genders = {
        male: 'Masculino',
        female: 'Feminino'
    }

    return genders[gender] || 'Não Encontrado'
}
