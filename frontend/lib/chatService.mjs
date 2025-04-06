import OpenAI from "openai"
import axios from 'axios';
import dotenv from 'dotenv';
import { getAllRoutes, getAllHotels, getAllTrayectories } from "@/api/services"

dotenv.config();
//const API_KEY_OPENROUTER=process.env.API_KEY_OPENROUTER;
const API_KEY_OPENROUTER = "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";

class Agent {
	constructor(context = "Eres un asistente de viajes en GreenLake") {
		this.apiKey = API_KEY_OPENROUTER;
		this.model = "meta-llama/llama-3.3-70b-instruct:free";
		this.messages = [{ role: 'system', content: context }];
		this.context = context;
	}

	async receiveMessage(message, history = true) {
		if (history) {
			this.messages.push({ role: 'user', content: message });
		}

		const messages = history
			? this.messages
			: [{ role: 'system', content: this.context }, { role: 'user', content: message }];

		try {
			const response = await axios.post(
				'https://openrouter.ai/api/v1/chat/completions',
				{
					model: this.model,
					messages: messages
				},

				{
					headers: {
						'Authorization': `Bearer ${this.apiKey}`,
						'Content-Type': 'application/json'
					}
				}
			);

			const responseMessage = response.data.choices[0].message.content;

			if (history) {
				this.messages.push({ role: 'assistant', content: responseMessage });
			}
			return responseMessage;

		} catch (error) {
			return 'Lo siento, no puedo responderle.';
		}
	}
}


function filterHotels(hotels, filterParams) {



	return hotels.filter(hotel => {
		const name = filterParams.name || null;
		const location = filterParams.location || null;
		const priceMin = filterParams.min_price || null;
		const priceMax = filterParams.max_price || null;
		const ratingMin = filterParams.min_review || null;
		const ratingMax = filterParams.max_review || null;
		const minReviews = filterParams.numberOfReviews || null;

		return (!name || hotel.name.includes(name)) &&
			(!location || hotel.location.includes(location)) &&
			(!priceMin || hotel.pricePerNight >= priceMin) &&
			(!priceMax || hotel.pricePerNight <= priceMax) &&
			(!ratingMin || hotel.averageRating >= ratingMin) &&
			(!ratingMax || hotel.averageRating <= ratingMax) &&
			(!minReviews || hotel.numberOfReviews >= minReviews);
	}).sort((a, b) => b.averageRating - a.averageRating).slice(0, 5);
}


function filterRoutes(routes, filterParams) {
	const filteredRoutes = routes.filter(route => {
		const routeName = filterParams.routeName || null;
		const routeType = filterParams.routeType || null;
		const distanceKmMin = filterParams.distanceKm_min || null;
		const distanceKmMax = filterParams.distanceKm_max || null;
		const durationHoursMin = filterParams.durationHours_min || null;
		const durationHoursMax = filterParams.durationHours_max || null;
		const originName = filterParams.origin_name || null;

		return (!routeName || route.routeName.includes(routeName)) &&
			(!routeType || route.routeType === routeType) &&
			(!distanceKmMin || route.distanceKm >= distanceKmMin) &&
			(!distanceKmMax || route.distanceKm <= distanceKmMax) &&
			(!durationHoursMin || route.durationHours >= durationHoursMin) &&
			(!durationHoursMax || route.durationHours <= durationHoursMax) &&
			(!originName || route.origin.name.includes(originName));
	});

	return filteredRoutes.sort((a, b) => b.popularity - a.popularity).slice(0, 5);
}



class Chat {
	constructor() {
		this.agent_get_topic = new Agent("Tu tarea es analizar el mensaje del usuario y clasificarlo en una de las siguientes categorías: 'hotel', 'ruta', 'transporte' o 'conversación'. Devuelve solo la categoría más relevante sin agregar explicaciones. Puedes devolver ninguna o más de una seguida de comas.");
		this.agent_extract_json = new Agent(`El usuario ha solicitado información sobre una categoria. Extrae los valores relevantes y devuélvelos en formato JSON con las siguientes claves según la categoría:
Hotel: name, location, min_price, max_price, min_review, max_review, numberOfReviews.
Ruta: routeName, routeType(Aventura, Cultural, Gastronómica, Histórica, Ecológica), distanceKm_min, distanceKm_max, durationHours_min, durationHours_max, durationHours_min (numero del 0 al 50), durationHours_max (numero del 0 al 50), origin_name.
Transporte: tipo(Autobús, Tranvía, Coche Compartido, Taxi, Bicicleta, Metro), tiempo_min, tiempo_max, salida, llegada.
Si el usuario no proporciona un dato, deja su valor como null. Si para unos valores con max y min el usuario da un valor que no es maximo ni minimo, pon un rango entre esos valores, pero no pongas lo mismo en maximo y en minimo. No agregues explicaciones, solo devuelve el JSON."`);
		this.agent_generate_chat = new Agent("Eres un asistente de viajes, genera una respuesta amigable y útil basada en los datos de la base de datos. Si no hay información, ofrece una alternativa o pide más detalles.");


		this.hotels = [];
		this.routes = [];
		this.transport = [];

	}


	async init() {
		try {
			this.hotels = await getAllHotels();
			this.routes = await getAllRoutes();
			//this.transport = await getAllTrayectories();	


			console.log("Datos precargados para el chatbot" + this.hotels);
		} catch (err) {
			console.error("Error cargando datos iniciales para el chatbot", err);
		}
	}

	async getJsonInfo(topic, message) {
		let json_info = await this.agent_extract_json.receiveMessage("topic: '" + topic + "' user message: '" + message + "'");
		json_info = json_info.match(/```json([\s\S]*?)```/);
		json_info = json_info[1];
		json_info = JSON.parse(json_info);

		return json_info;
	}

	async receiveMessage(message) {
		await this.init();

		let topic = await this.agent_get_topic.receiveMessage(message);
		let response = "Lo siento, ha ocurrido un error.";

		if (!(topic.includes('hotel') || topic.includes('ruta') || topic.includes('transporte'))) {
			response = await this.agent_generate_chat.receiveMessage(message, true);
		} else {
			let db_information = "";
			if (topic.includes('hotel')) {
				let json_info = await this.getJsonInfo('hotel', message);

				db_information += filterHotels(this.hotels, json_info).map(hotel => `${hotel.name} ${hotel.description} ${hotel.location} ${hotel.pricePerNight}€ ${hotel.averageRating} ${hotel.numberOfReviews}`).join(", ");
			}
			if (topic.includes('ruta')) {
				let json_info = await this.getJsonInfo('ruta', message);

				db_information += filterRoutes(this.routes, json_info).map(route => `${route.routeName} ${route.routeType} ${route.distanceKm}km ${route.durationHours}h ${route.popularity}`).join(", ");
			}
			if (topic.includes('transporte')) {
				let json_info = await this.getJsonInfo('transporte', message);
				db_information += "";

			}
			response = await this.agent_generate_chat.receiveMessage("Responde a este mensaje: '" + message + "' sabiendo:'" + db_information + "'");
			response = response.replace(/\*/g, '').trim();
		}
		return response
	}
}

export default Chat;