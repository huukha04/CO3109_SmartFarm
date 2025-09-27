import { type DefaultSession } from "next-auth"

declare module "@auth/core/jwt" {
  interface JWT {
    id: string
    email: string
    name: string | null
    image: string | null
    accessToken: string
    provider?: string
    phone?: string // ✅ Thêm phone
	jobTitle?: string
	company?: string
	bio?: string
	location?: string

  }
}

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string
      email: string
      name: string | null
      image: string | null
      accessToken: string
      provider?: string
      phone?: string // ✅ Thêm phone
	  jobTitle?: string
	  company?: string
	  bio?: string
	  location?: string
    }
  }
}
