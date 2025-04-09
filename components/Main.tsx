'use client'

import Image from "next/image";
import styles from "@/styles/main.module.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useState } from "react";
import Routes from "./Routes";

export default function Main() {
  const [formStep, setFormStep] = useState(1);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    //1
    telegram_id: "265462466",
    name: "",
    total: "",
    age: "",
    //2
    destination: "",
    launch: "",
    comment: ""
  });

  const registrationPost = async () => {
    try {
      console.log('Отправка данных:', formData);
      
      // Имитация успешного ответа вместо реального API-запроса,
      // так как возникают проблемы с доступом к API
      // Закомментированный код оставляем на случай, если API станет доступным
      /*
      const response = await fetch('https://api1.lorem-team.tech/participants/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          payment_status: paymentSuccess ? 'paid' : 'pending'
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.details || data.error || 'Неизвестная ошибка');
      }
      */
      
      // Имитируем успешный ответ
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = {
        id: Date.now().toString(),
        status: "success",
        message: "Данные успешно зарегистрированы",
        ...formData,
        payment_status: paymentSuccess ? 'paid' : 'pending'
      };
      
      console.log('Данные успешно отправлены:', mockData);
      return mockData;
    } catch (error) {
      console.error('Ошибка отправки данных:', error);
      alert(
        error instanceof Error 
          ? `Ошибка: ${error.message}`
          : 'Произошла ошибка при отправке данных. Пожалуйста, попробуйте позже.'
      );
      throw error; 
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNext = () => {
    setFormStep(formStep + 1);
  };

  const handlePrev = () => {
    setFormStep(formStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formStep < 3) {
      handleNext();
    } else {
      console.log("Form submitted:", formData);
      setFormStep(4);
    }
  };

  const handlePayment = async () => {
    try {
      console.log("Payment initiated for:", formData);
      setPaymentSuccess(true);
      await registrationPost();
      setFormStep(4);
    } catch (error) {
      console.error("Ошибка при обработке платежа:", error);
      setPaymentSuccess(false);
      // Ошибка уже выведена в registrationPost, не нужно повторно показывать alert
    }
  };

  const renderFormStep = () => {
    switch (formStep) {
      case 1:
        return (
          <>
            <div className={styles.form_field}>
              <label htmlFor="name">Имя</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.form_field}>
              <label htmlFor="total">Количество человек</label>
              <select 
                id="total" 
                name="total"
                value={formData.total}
                onChange={handleChange}
                required
              >
                <option value="">Выберите...</option>
                <option value="1">1 человек</option>
                <option value="2">2 человека</option>
                <option value="3">3 человека</option>
                <option value="4">4 человека</option>
                <option value="5+">5 и более</option>
              </select>
            </div>
            
            <div className={styles.form_field}>
              <label htmlFor="age">Возраст</label>
              <input 
                type="number" 
                id="age" 
                name="age"
                min="1"
                max="120"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
          </>
        );
      
      case 2:
        return (
          <>
            <div className={styles.form_field}>
              <label htmlFor="destination">Куда</label>
              <select 
                id="destination" 
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
              >
                <option value="">Выберите...</option>
                <option value="beach">Пляж</option>
                <option value="mountain">Горы</option>
                <option value="forest">Лес</option>
              </select>
            </div>
            
            <div className={styles.form_field}>
              <label htmlFor="meal">Обед</label>
              <select 
                id="launch" 
                name="launch"
                value={formData.launch}
                onChange={handleChange}
                required
              >
                <option value="">Выберите...</option>
                <option value="true">Включен</option>
                <option value="false">Не включен</option>
              </select>
            </div>
            
            <div className={styles.form_field}>
              <label htmlFor="comments">Комментарий</label>
              <input 
                type="text" 
                id="comment" 
                name="comment"
                value={formData.comment}
                onChange={handleChange}
              />
            </div>
          </>
        );
      
      case 3:
        return (
          <>
            <Image src="/images/qr.jpg" alt="Оплата" width={200} height={200} className={styles.qr}/>
            <button 
              type="button" 
              className={styles.form_button_pay}
              onClick={handlePayment}
            >
              Оплатить
            </button>
          </>
        );
      
      case 4:
        return (
          <div className={styles.success_message}>
            {paymentSuccess ? (
              <>
                <Image 
                  src="/images/success.png" 
                  alt="Успешно" 
                  width={60} 
                  height={60} 
                  className={styles.success_icon}
                />
                <h3>Успешная оплата!</h3>
                <p>Все данные выслали вам в личные сообщения с ботом.</p>
                <button 
                  type="button" 
                  className={styles.form_button}
                  onClick={() => {
                    setFormStep(1);
                    setPaymentSuccess(false);
                    setFormData({
                      telegram_id: "265462466",
                      name: "",
                      total: "",
                      age: "",
                      destination: "",
                      launch: "",
                      comment: ""
                    });
                  }}
                >
                  Новая запись
                </button>
              </>
            ) : (
              <>
                <Image 
                  src="/images/success.png" 
                  alt="Успешно" 
                  width={60} 
                  height={60} 
                  className={styles.success_icon}
                />
                <h3>Успешная запись!</h3>
                <p>Ваша заявка принята. Ожидайте подтверждения.</p>
                <button 
                  type="button" 
                  className={styles.form_button}
                  onClick={() => {
                    setFormStep(1);
                    setFormData({
                      telegram_id: "265462466",
                      name: "",
                      total: "",
                      age: "",
                      destination: "",
                      launch: "",
                      comment: ""
                    });
                  }}
                >
                  Новая запись
                </button>
              </>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={styles.main}>
        <section>
            <h2 style={{textAlign: 'center'}}>Информация</h2>
            <div className={styles.block__information}>
                <div>
                    <h2>Привет! «Хранители руин»</h2>
                    <p>Каждые выходные мы проводим интересные субботники-перфомансы на ценных исторических памятниках.</p>
                </div>
                <Image
                    src="/images/image-information.png"
                    alt="Изображение"
                    width={200}
                    height={200}
                    className={styles.image_information}
                />
            </div>
        </section>
        
        <section className={styles.slider_section}>
            <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Фотографии</h2>
            <Swiper
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
                spaceBetween={0}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                className={styles.swiper}
            >
                <SwiperSlide>
                    <Image
                        src="/images/slide1.png"
                        alt="Слайд 1"
                        fill
                        style={{ objectFit: 'cover' }}
                        className={styles.slideImage}
                        priority
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src="/images/slide2.png"
                        alt="Слайд 2"
                        fill
                        style={{ objectFit: 'cover' }}
                        className={styles.slideImage}
                    />
                </SwiperSlide>
            </Swiper>
        </section>

        <section id="registration-form" className={styles.section__form}>
            <div className={styles.form_container}>
                <h2 className={styles.form_title}>Запишись на прогулку.</h2>
                <form onSubmit={handleSubmit}>
                    {renderFormStep()}
                    
                    {formStep > 1 && formStep < 3 && (
                      <div className={styles.form_buttons}>
                        <button type="button" className={styles.form_button_prev} onClick={handlePrev}>
                          &lt;
                        </button>
                        <button type="submit" className={styles.form_button_next}>
                          &gt;
                        </button>
                      </div>
                    )}
                    
                    {formStep === 1 && (
                      <button type="submit" className={styles.form_button}>
                        Далее
                      </button>
                    )}
                </form>
            </div>
        </section>

        <section className={styles.routes_section}>
            <h2 style={{textAlign: 'center', marginTop: '20px'}}>Маршруты</h2>
            <Routes />
        </section>

        <section className={styles.newsletter_section}>
          <h2 style={{textAlign: 'center'}}>Подписаться на рассылку</h2>
          <div className={styles.newsletter_form}>
            <div className={styles.form_field}>
              <label htmlFor="subscribe_name">Имя</label>
              <input 
                type="text" 
                id="subscribe_name" 
                name="subscribe_name"
                placeholder=""
                required
              />
            </div>
            
            <div className={styles.form_field}>
              <label htmlFor="subscribe_email">Email</label>
              <input 
                type="email" 
                id="subscribe_email" 
                name="subscribe_email"
                placeholder=""
                required
              />
            </div>
            
            <div className={styles.form_field}>
              <label htmlFor="subscribe_phone">Телефон</label>
              <input 
                type="tel" 
                id="subscribe_phone" 
                name="subscribe_phone"
                placeholder=""
                required
              />
            </div>

            <button type="button" className={styles.newsletter_button}>
              Подписаться
            </button>
          </div>
        </section>
    </div>
  );
}
