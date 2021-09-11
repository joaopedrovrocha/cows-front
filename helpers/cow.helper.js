import moment from "../lib/moment"

export function getBirthMonth(birthMonth) {
    if (!birthMonth) {
        return ''
    }

    return moment(birthMonth, 'YYYY-MM').format('MM/YYYY')
}

export function getAge(birthMonth) {
    if (!birthMonth) {
        return ''
    }

    return moment(birthMonth, 'YYYY-MM').fromNow(true)
}

export function parseBirthMonthToDatabase(birthMonth) {
    if (!birthMonth) {
        return ''
    }

    return birthMonth.split('/').reverse().join('-')
}

export function parseBirthMonthToView(birthMonth) {
    if (!birthMonth) {
        return ''
    }

    return birthMonth.split('-').reverse().join('/')
}

export function getGender(gender) {
    const genders = {
        male: 'Masculino',
        female: 'Feminino'
    }

    return genders[gender] || 'Não Encontrado'
}

export function sumCows(arr) {
    return arr.reduce((acc, el) => {
        return acc + parseInt(el.quantity || 1)
    }, 0)
}