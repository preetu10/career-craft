import React, { useContext } from 'react'
import { AuthContext } from '../pages/providers/AuthProvider'

export default function useAuth() {
    const auth =useContext(AuthContext)
  return auth;
}
