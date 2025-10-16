import React from 'react'

const sizes = {
	sm: 'max-w-md',
	md: 'max-w-2xl',
	lg: 'max-w-4xl'
}

const Modal = ({ isOpen, onClose, title, children, footer, size = 'md' }) => {
	if (!isOpen) return null

	const panelClass = `w-full ${sizes[size]}`

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center'>
			<div className='fixed inset-0 bg-black opacity-40' onClick={onClose} />

			<div className='relative z-10 p-4 w-full'>
				<div className={`mx-auto ${panelClass} bg-white rounded shadow-lg overflow-hidden`}>
					<div className='flex items-center justify-between px-6 py-4 border-b'>
						<h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
						<button onClick={onClose} className='text-gray-500 hover:text-gray-700' aria-label='Close'>
							✕
						</button>
					</div>

					<div className='px-6 py-4'>
						{children}
					</div>

					{footer && (
						<div className='px-6 py-3 border-t bg-gray-50'>
							{footer}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Modal
