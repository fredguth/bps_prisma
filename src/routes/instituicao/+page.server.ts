// import { fail } from '@sveltejs/kit'

// export const actions = {
// 	default: async ({ request }) => {
// 		const formData = Object.fromEntries(await request.formData())

// 		if (
// 			!(formData.fileToUpload as File).name ||
// 			(formData.fileToUpload as File).name === 'undefined'
// 		) {
// 			return fail(400, {
// 				error: true,
// 				message: 'You must provide a file to upload',
// 			})
// 		}

// 		const { fileToUpload } = formData as { fileToUpload: File }
// 	},
// }
