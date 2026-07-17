<script setup lang="ts">
import { RouterLink } from "vue-router";
import PageShell from "../components/PageShell.vue";
import styles from "./PrivacyPage.module.css";

const updatedAt = "17.07.2026";
</script>

<template>
  <PageShell title="Конфиденциальность">
    <article :class="styles.article">
      <p :class="styles.lead">
        Политика в отношении обработки информации на сайте «Зайка-Читайка»
        (далее — Сайт). Документ составлен с учётом требований Федерального
        закона от 27.07.2006 №&nbsp;152-ФЗ «О персональных данных» и
        Федерального закона от 27.07.2006 №&nbsp;149-ФЗ «Об информации,
        информационных технологиях и о защите информации».
      </p>

      <section :class="styles.block" aria-labelledby="privacy-general">
        <h2 id="privacy-general" :class="styles.heading">
          1. Общие положения
        </h2>
        <p :class="styles.text">
          Сайт предназначен для обучения чтению и счёту. Регистрация,
          личный кабинет и сбор фамилии, имени, отчества, телефона, адреса
          электронной почты и иных идентификационных данных пользователя
          <strong>не ведутся</strong>.
        </p>
        <p :class="styles.text">
          Оператором обработки персональных данных в части аналитики
          посещаемости Сайта выступает лицо, разместившее Сайт. По вопросам
          обработки данных можно написать авторам через контакты на странице
          <RouterLink to="/about" :class="styles.link">Об авторах</RouterLink>.
        </p>
      </section>

      <section :class="styles.block" aria-labelledby="privacy-progress">
        <h2 id="privacy-progress" :class="styles.heading">
          2. Прогресс обучения
        </h2>
        <p :class="styles.text">
          На устройстве пользователя (в памяти браузера, localStorage)
          сохраняется только учебный прогресс: изученные буквы, слоги, слова,
          цифры, числа и сведения о сданных разделах.
        </p>
        <p :class="styles.text">
          Эти сведения не передаются на серверы Оператора, не связываются с
          учётной записью и используются исключительно для работы Сайта на
          вашем устройстве. Такой локальный прогресс не является сбором
          персональных данных Оператором в смысле ст.&nbsp;3 152-ФЗ.
        </p>
        <p :class="styles.text">
          Прогресс можно удалить в любой момент в
          <RouterLink to="/settings" :class="styles.link">Настройках</RouterLink>
          («Сбросить прогресс») либо очистив данные сайта в браузере.
        </p>
      </section>

      <section :class="styles.block" aria-labelledby="privacy-analytics">
        <h2 id="privacy-analytics" :class="styles.heading">
          3. Аналитика и файлы cookie
        </h2>
        <p :class="styles.text">
          Для улучшения Сайта может использоваться сервис
          <strong>Яндекс Метрика</strong> (ООО «Яндекс», серверы на территории
          РФ). Сервис обрабатывает технические и поведенческие данные
          посетителя (в том числе cookie, IP-адрес, данные об устройстве и
          действиях на Сайте, в том числе при включённых функциях карты
          кликов и вебвизора).
        </p>
        <p :class="styles.text">
          По позиции Роскомнадзора сведения, собираемые метрическими
          программами, относятся к персональным данным. Обработка
          осуществляется на основании
          <strong>согласия</strong> субъекта персональных данных
          (п.&nbsp;1 ч.&nbsp;1 ст.&nbsp;6 152-ФЗ), которое запрашивается при
          первом посещении Сайта. До согласия счётчик Метрики
          <strong>не загружается</strong>.
        </p>
        <p :class="styles.text">
          Отказ от аналитики не мешает пользоваться Сайтом и сохранять
          прогресс обучения. Согласие можно отозвать, очистив данные сайта
          в браузере или отклонив аналитику в баннере при следующем
          запросе согласия.
        </p>
        <p :class="styles.text">
          Подробнее об обработке данных сервисом:
          <a
            href="https://yandex.ru/legal/confidential/"
            target="_blank"
            rel="noopener noreferrer"
            :class="styles.link"
          >
            Политика конфиденциальности Яндекса
          </a>
          и
          <a
            href="https://yandex.ru/legal/metrica_termsofuse/"
            target="_blank"
            rel="noopener noreferrer"
            :class="styles.link"
          >
            Условия использования Яндекс Метрики
          </a>.
        </p>
      </section>

      <section :class="styles.block" aria-labelledby="privacy-rights">
        <h2 id="privacy-rights" :class="styles.heading">
          4. Права пользователя
        </h2>
        <p :class="styles.text">
          В соответствии со ст.&nbsp;14 152-ФЗ субъект персональных данных
          вправе получать сведения об обработке своих данных, требовать их
          уточнения, блокирования или уничтожения, а также отозвать согласие
          на обработку (в части аналитики — отказавшись от Метрики).
        </p>
        <p :class="styles.text">
          Обращения направляйте через контакты на странице
          <RouterLink to="/about" :class="styles.link">Об авторах</RouterLink>.
        </p>
      </section>

      <section :class="styles.block" aria-labelledby="privacy-changes">
        <h2 id="privacy-changes" :class="styles.heading">
          5. Изменения политики
        </h2>
        <p :class="styles.text">
          Актуальная редакция всегда доступна на этой странице. Дата
          последнего обновления: {{ updatedAt }}.
        </p>
      </section>
    </article>
  </PageShell>
</template>
