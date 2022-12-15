import style from './style.module.scss'

const Authorized = () => {
    const user = JSON.parse(localStorage.getItem('auth') as string)
    
    return (
        <div className={style.authorized}>
            <div className={style.avatar}>
                <div className={style.avatar__inside}>
                    <img src={user.photoURL} alt="authorized__avatar" />
                </div>
            </div>
            <div className={style.authorized__info}>
                <p className={style.authorized__name}>{user.displayName}</p>
                <p className={style.authorized__level}>7 level</p>
            </div>
        </div>
    )
}

export default Authorized