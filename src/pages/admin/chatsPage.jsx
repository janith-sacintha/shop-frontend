import { useEffect, useState } from "react"
import axios from "axios"
import { FiMail } from "react-icons/fi"
import toast from "react-hot-toast"

export default function AdminChatPanel() {
  const [conversations, setConversations] = useState([])
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [emailSubject, setEmailSubject] = useState("")
  const [emailBody, setEmailBody] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/contact-us/messages/grouped", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => setConversations(res.data))
      .catch((err) => console.error(err))
  }, [])

  const selectedConversation = conversations.find((c) => c.email === selectedEmail)

  const handleSendEmail = () => {
    if (!emailBody.trim() || !emailSubject.trim()) return
    const token = localStorage.getItem("token")
    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/api/send-email",
        {
          to: selectedEmail,
          subject: emailSubject,
          body: emailBody,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(() => {
        setEmailSubject("")
        setEmailBody("")
        toast.success("Email sent!")
      })
  }

  return (
    <div className="w-full h-screen flex bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="w-1/4 bg-white border-r shadow-xl overflow-y-auto rounded-r-2xl">
        <h2 className="text-xl font-semibold p-5 border-b bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-2xl">
          User Messages
        </h2>
        {conversations.map((conv) => (
          <div
            key={conv.email}
            className={`p-5 cursor-pointer border-b transition ${
              selectedEmail === conv.email
                ? "bg-blue-50 border-l-4 border-blue-500"
                : "hover:bg-gray-50"
            }`}
            onClick={() => setSelectedEmail(conv.email)}
          >
            <p className="font-semibold text-gray-800">{conv.name}</p>
            <p className="text-sm text-gray-500">{conv.email}</p>
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="p-5 border-b bg-white shadow-sm flex items-center justify-between">
              <h2 className="font-bold text-lg text-gray-700">
                {selectedConversation.name}
              </h2>
              <span className="text-sm text-gray-500">{selectedConversation.email}</span>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-3 bg-gray-50">
              {selectedConversation.messages.map((msg, index) => (
                <div
                  key={index}
                  className="px-5 py-3 rounded-xl bg-gray-200 text-gray-800 shadow-sm"
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="p-5 border-t bg-white shadow-md space-y-3">
              <input
                type="text"
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Email Subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
              <textarea
                className="w-full border rounded-xl px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Write your reply..."
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
              />
              <button
                onClick={handleSendEmail}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition shadow-md"
              >
                <FiMail size={18} /> Send Email
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
            Select a conversation to view messages
          </div>
        )}
      </div>
    </div>
  )
}
