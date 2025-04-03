import OpenAI from "openai"
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
//const API_KEY_OPENROUTER=process.env.API_KEY_OPENROUTER;
const API_KEY_OPENROUTER="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";


class Agent {
	constructor(context="Eres un asistente de viajes en GreenLake") {
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
    		console.error('Error al obtener la respuesta:', error);
  			return 'Lo siento, no puedo responderle.';
    	}
  	}
}



class Chat{
	constructor(){
		this.agent_get_topic = new Agent("Tu tarea es analizar el mensaje del usuario y clasificarlo en una de las siguientes categorías: 'hotel', 'ruta', 'transporte' o 'conversación'. Devuelve solo la categoría más relevante sin agregar explicaciones.");
		this.agent_extract_json = new Agent(`El usuario ha solicitado información sobre una categoria. Extrae los valores relevantes y devuélvelos en formato JSON con las siguientes claves según la categoría:
Hotel: hotel_nombre, precio_min, precio_max.
Ruta: nombre, tipo_ruta(Aventura, Cultural, Gastronómica, Histórica, Ecológica), km_min, km_max, hour_min, hour_max, popular_min (numero del 0 al 5), popular_max (numero del 0 al 5).
Transporte: tipo(Autobús, Tranvía, Coche Compartido, Taxi, Bicicleta, Metro), tiempo_min, tiempo_max, salida, llegada.
Si el usuario no proporciona un dato, deja su valor como null. Si para unos valores con max y min el usuario da un valor que no es maximo ni minimo, pon un rango entre esos valores, pero no pongas lo mismo en maximo y en minimo. No agregues explicaciones, solo devuelve el JSON."`);
		this.agent_generate_chat = new Agent("Eres un asistente de viajes, genera una respuesta amigable y útil basada en los datos de la base de datos. Si no hay información, ofrece una alternativa o pide más detalles.");
	}

	async receiveMessage(message){
		let topic = await this.agent_get_topic.receiveMessage(message);
		let response = "Lo siento, ha ocurrido un error.";
		console.log(topic);
		if (!(topic.includes('hotel') || topic.includes('ruta') || topic.includes('transporte'))){
			response = await this.agent_generate_chat.receiveMessage(message,true);
		}else{
			const json_info = await this.agent_extract_json.receiveMessage("topic: '"+topic+"' user message: '"+message+"'");
			let db_information = "";
			if(topic.includes('hotel')){
				// "Hola, no se que hotel coger, solo puedo gastarme 100€ la noche."
				//```json
				//{
				//"hotel_nombre": null,
				//"precio_min": null,
				//"precio_max": 100
				//}
				//```
				db_information += "hotel_azul 50€, hotel_verde 30€, hotel_amarillo 20€, hotel_gris 80€;";
			}
			if(topic.includes('ruta')){
				// "Quiero hacer una ruta de mas o menos 7km que no sea muy popular."
				//```json
				//{
				//	"nombre": null,
				//	"tipo_ruta": null,
				//	"km_min": 6,
				//	"km_max": 8,
				//	"hour_min": null,
				//	"hour_max": null,
				//	"popular_min": 0,
				//	"popular_max": 2
				//}
				//```
				db_information += "ruta los pinos Cultural 6.8km 3h 0.6 popularidad, ruta las cazuelas Gastronomica 7.5km 4.2h 1.5popularidad";
			}
			if(topic.includes('transporte')){
				// "Me puedes decir a dónde puedo ir en Tranvía desde Alletra City"
				//```json
				//{
				//	"tipo": "Tranvía",
				//	"tiempo_min": null,
				//	"tiempo_max": null,
				//	"salida": "Alletra City",
				//	"llegada": null
				//}
				//```
				db_information += "Tranvía de Alletra City a Plaza Molinos entre 5 y 6 minutos; Tranvía de Alletra City a la fuente giratoria de 10 a 12 minutos; Tranvía de Alletra City a Torre Eifell de 20 a 27 minutos";
  
			}
			response=this.agent_generate_chat.receiveMessage("Responde a este mensaje: '"+message+"' sabiendo:'"+db_information+"'");

			console.log(json_info);
		}
		return response
	}
}

export default Chat;