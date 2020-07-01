import React from "react"
import { render } from "react-dom"
import App from "./App.js"
import { RecoilRoot } from "recoil"
import "./index.css"


const root = document.getElementById("root")


render(<RecoilRoot>
    <App />
</RecoilRoot>, root)