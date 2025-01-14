import '../../styles/alert/Alert.css'

// 下から出てくるアラート　これは消さなくても操作できるアラート
function Alert(Text: string, type: string) {
    if (!(type === "error" || type === "success" || type === "neutual"))
        console.error(`type is error or success but it is ${type}`)
    const parent = document.querySelector(".overlay")
    const alert = document.createElement("div")
    const alertText = document.createElement("p")
    alert.classList.add("alert")
    alert.classList.add(type)
    alertText.classList.add("alert-text")
    alertText.textContent = Text
    alert.appendChild(alertText)
    parent.appendChild(alert)
    setTimeout(() => {
        alert.remove()
    }, 3000)
    return (
        <div className="alert">
            <p>{Text}</p>
        </div>
    )
}

export default Alert