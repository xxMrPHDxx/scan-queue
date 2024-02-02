"use client"
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [hidden, setHidden] = useState(true)
  const [loading, setLoading] = useState(false)

  async function login() {
    setLoading(true)
    const { success, message } = await fetch(
      '/api/login',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: username, pass: password,
        }),
      }
    )
      .then(res => res.json())
    if (!success) Swal.fire('Error', message, 'error')
    else {
      Swal.fire('Success', 'Login success!', 'success')
      // sessionStorage.setItem('loggedInUser', username)
      redirect('/pup_page')
    }
    setLoading(false)
  }

  // if (sessionStorage.loggedInUser) {
  //   return redirect('/pup_page')
  // }

  const canLogin = !loading && username && password

  return <>
    <div className="container-fluid h-100">
      <div className="col-sm-6 col-md-4 mx-auto min-vh-100 d-flex align-items-center">
        <div className="card card-body">
          <h3 className="text-center">Login</h3>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
              value={username} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="position-relative">
              <input
                type={hidden ? "password" : "text"}
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                value={password} />
              <i
                className={`position-absolute translate-middle top-50 end-0 fas ${!hidden ? 'fa-eye' : 'fa-eye-slash text-muted'}`}
                onClick={() => setHidden(!hidden)} />
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={login}
            disabled={!canLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  </>;
}
