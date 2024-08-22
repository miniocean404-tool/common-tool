import { getToken } from "@/utils/adapter/token"

export default function AuthMiddleware({ children }) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname !== "login" && !getToken()) {
      navigate("/login", { replace: true })
    }
  }, [])
  return children
}
