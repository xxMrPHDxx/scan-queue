import { useEffect, useState } from "react"

class Queue extends Array {
  pop() {
    if (this.length === 0) return;
    return this.splice(0, 1)[0]
  }
}

export default function () {
  const [bookingNo, setBookingNo] = useState('')
  const [routeCode, setRouteCode] = useState('')
  const [scannable, setScannable] = useState(false)
  const [consNo, setConsNo] = useState('')
  const [scanList, setScanList] = useState(new Queue())

  async function scan() {
    const body = new FormData()
    body.append('bookingNo', bookingNo)
    body.append('routeCode', routeCode)
    const { success, message } = await fetch('/api/scan', {
      method: 'post',
      body,
    })
      .then(res => res.json())
    if (!success) {
      alert(message)
    } else {
      alert('Successfully scanned!')
      setScannable(true)
    }
  }

  function completeScan() {
    setBookingNo('')
    setRouteCode('')
    setScanList(new Queue())
    setScannable(false)
  }

  function performScan() {
    if (consNo.length < 6) return
    scanList.push(consNo)
    setScanList(scanList)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const ConsScan = scanList.pop()
      if (!ConsScan) return
      const error = Math.random() < 0.5
      if (error) console.log('Scanning', ConsScan, 'Error')
      else console.log('Scanning', ConsScan, 'Success')
      new Audio(`${error ? 'error' : 'scan'}.mp3`).play()
      setScanList(scanList)
    }, 200)
    return () => clearInterval(timer)
  })

  const canStartScan = bookingNo && routeCode && !scannable

  return <>
    <div className="container-fluid h-100">
      <div className="col-sm-6 mx-auto min-vh-100 d-flex align-items-center">
        <div className="card card-body">
          <h2>PUP Page</h2>
          {scanList.length > 0 && <div className="mb-3">
            <span>Total Scan: {scanList.length}</span>
          </div>}
          <div className="form-group mb-3">
            <label htmlFor="bookingNo" className="form-label">Booking No</label>
            <input
              type="text" className="form-control"
              onChange={(e) => setBookingNo(e.target.value)}
              value={bookingNo} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="routeCode" className="form-label">Route Code</label>
            <input
              type="text" className="form-control"
              onChange={(e) => setRouteCode(e.target.value)}
              value={routeCode} />
          </div>
          <button
            className="btn btn-primary mb-2"
            onClick={scan}
            disabled={!canStartScan}>
            Start Scan
          </button>
          <button
            className="btn btn-primary"
            onClick={completeScan}
            disabled={!scannable}>
            Complete
          </button>
          {scannable && <div className="mt-3">
            <input
              type="text" className="form-control"
              onChange={(e) => setConsNo(e.target.value)}
              value={consNo}
              onKeyDown={(e) => e.key === 'Enter' && performScan()} />
          </div>}
        </div>
      </div>
    </div>
  </>
}