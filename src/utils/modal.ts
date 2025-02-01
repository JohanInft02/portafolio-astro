export function openModal(modalId: string) {
	const modal = document.getElementById(modalId);
	if (modal) {
		modal.classList.remove('hidden');
	}
}

export function closeModal(modalId: string) {
	const modal = document.getElementById(modalId);
	if (modal) {
		modal.classList.add('hidden');
	}
}

