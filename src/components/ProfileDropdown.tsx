import { User as UserIcon } from 'lucide-react';
import React, { useRef, useEffect } from 'react';

interface ProfileDropdownProps {
  userEmail: string | null;
  showDropdown: boolean;
  setShowDropdown: (v: boolean) => void;
  handleLogout: () => void;
}

export default function ProfileDropdown({
  userEmail,
  showDropdown,
  setShowDropdown,
  handleLogout,
}: ProfileDropdownProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
        return;
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && showDropdown) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [showDropdown, setShowDropdown]);

  return (
    <div className='relative'>
      <button
        ref={buttonRef}
        className="flex cursor-pointer items-center justify-center max-[470px]:w-8 max-[470px]:h-8 w-10 h-10 rounded-full bg-red-800 hover:bg-red-900 text-white focus:outline-none"
        onClick={() => setShowDropdown(!showDropdown)}
        title="Profile"
      >
        <UserIcon className="w-6 h-6 max-[470px]:w-5 max-[470px]:h-5" />
      </button>
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute right-5 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20 animate-fade-in"
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm text-gray-700 font-semibold text-wrap break-all">{userEmail || 'No email'}</p>
          </div>
          <button
            className="w-full cursor-pointer text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-b-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
