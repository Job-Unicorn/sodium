import React from 'react'
import { Button } from '@chakra-ui/button'
import { useColorMode } from '@chakra-ui/color-mode'
import { FaMoon, FaSun } from 'react-icons/fa'

/**
 * 
 * **Toggles Chakra Color Mode**
 * 
 * ---
 * 
 * Usage:
 * 
 * ```ts
 * import ToggleTheme from '@/components/general/ToggleTheme'
 * 
 * ... 
 * 
 * return <ToggleTheme />
 * ``` 
 */

const ToggleTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Button onClick={toggleColorMode} variant="ghost">
      {colorMode === 'light' ? <FaMoon/> : <FaSun />}
    </Button>
  )
}

export default ToggleTheme
