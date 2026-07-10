<!-- <template>
  <div
    v-if="isPageLoading"
    class="z-[100] fixed inset-0 flex flex-col justify-center items-center bg-white"
  >
    <div class="flex gap-2 mb-4">
      <div class="w-3 h-3 bg-black rounded-full animate-bounce-1"></div>
      <div class="w-3 h-3 bg-black rounded-full animate-bounce-2"></div>
      <div class="w-3 h-3 bg-black rounded-full animate-bounce-3"></div>
    </div>
    <p class="font-serif text-sm italic tracking-widest text-gray-500 animate-pulse">
      {{ $t("payment.prepare_checkout") }}
    </p>
  </div>

  <div v-else class="max-w-6xl min-h-screen px-6 py-12 mx-auto md:py-24 animate-fade-in">
    <div v-if="checkoutItems.length === 0" class="py-20 text-center">
      <h2 class="mb-4 font-serif text-3xl">{{ $t("payment.bag_empty") }}</h2>
      <button
        @click="$router.push('/collections')"
        class="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase bg-black rounded-full"
      >
        {{ $t("payment.return_shop") }}
      </button>
    </div>

    <div v-else>
      <h1 class="mb-12 font-serif text-3xl tracking-tighter uppercase md:text-4xl">
        {{ $t("payment.checkout") }}
      </h1>

      <div class="flex flex-col gap-12 lg:flex-row">
        <div class="flex-grow space-y-12">
          <section>
            <div class="flex items-center gap-4 mb-4">
              <span
                class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
                >1</span
              >
              <h2 class="text-sm font-bold tracking-widest text-gray-900 uppercase">
                {{ $t("payment.shipping_address") }}
              </h2>
            </div>

            <div
              v-if="addresses.length === 0"
              class="py-10 text-center border border-gray-300 border-dashed bg-gray-50 rounded-2xl"
            >
              <p class="mb-2 text-sm italic text-gray-500">
                {{ $t("payment.no_address_found") }}
              </p>
              <button
                @click="openModal()"
                class="text-xs font-bold text-blue-600 underline"
              >
                {{ $t("payment.add_new_address") }}
              </button>
            </div>
            <div v-else class="space-y-4">
              <label
                v-for="addr in addresses"
                :key="addr.id"
                :class="[
                  selectedAddressId === addr.id
                    ? 'border-black ring-1 ring-black bg-white shadow-md'
                    : 'border-gray-100 bg-gray-50/50',
                ]"
                class="relative flex items-start p-6 transition-all border cursor-pointer rounded-2xl hover:bg-white"
              >
                <input
                  type="radio"
                  name="address"
                  :value="addr.id"
                  v-model="selectedAddressId"
                  class="w-4 h-4 mt-1 text-black border-gray-300 focus:ring-black"
                />
                <div class="flex-grow ml-4">
                  <div class="flex justify-between">
                    <p class="text-sm font-bold text-gray-900 uppercase">
                      {{ addr.receiver.full_name }}
                    </p>
                    <span
                      v-if="addr.is_default"
                      class="text-[9px] bg-gray-200 px-2 py-0.5 rounded font-bold uppercase"
                      >{{ $t("payment.default") }}</span
                    >
                  </div>
                  <p class="mt-2 text-sm leading-relaxed text-gray-600">
                    {{ addr.details.location }}, {{ addr.details.type }} <br />
                    {{ addr.details.city }}, {{ addr.details.province }} <br />
                    {{ addr.details.region }} - {{ addr.details.postal_code }}
                  </p>
                </div>
              </label>
              <button
                @click="openModal()"
                class="mt-4 text-xs font-bold text-gray-500 underline hover:text-black"
              >
                {{ $t("payment.add_another_address") }}
              </button>
            </div>
          </section>

          <section v-if="!selectedAddressId">
            <div class="flex items-center gap-4 mb-4">
              <span
                class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
                >2</span
              >
              <h2 class="text-sm font-bold tracking-widest text-gray-900 uppercase">
                {{ $t("payment.shipping_method") }}
              </h2>
            </div>

            <div>
              <h4 class="text-sm tracking-widest text-gray-900 uppercase">
                {{ $t("payment.choose_shipping_address") }}
              </h4>
            </div>
          </section>

          <section v-if="selectedAddressId">
            <div class="flex items-center gap-4 mb-4">
              <span
                class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
                >2</span
              >
              <h2 class="text-sm font-bold tracking-widest text-gray-900 uppercase">
                {{ $t("payment.shipping_method") }}
              </h2>
            </div>

            <div class="space-y-4">
              <label
                :class="[
                  shippingMethod === 'free'
                    ? 'border-black ring-1 ring-black bg-white shadow-md'
                    : 'border-gray-100 bg-gray-50/50',
                ]"
                class="relative flex items-center p-6 transition-all border cursor-pointer rounded-2xl"
              >
                <input
                  type="radio"
                  value="free"
                  v-model="shippingMethod"
                  class="w-4 h-4 text-black border-gray-300 focus:ring-black"
                />
                <div class="flex items-center justify-between flex-grow ml-4">
                  <div>
                    <p class="text-sm font-bold tracking-wide text-gray-900 uppercase">
                      {{ $t("payment.free_shipping") }}
                    </p>
                    <p class="mt-1 text-xs font-bold text-green-600">
                      {{ $t("payment.in_store") }}
                    </p>
                  </div>
                  <p class="font-black text-black">{{ $t("payment.price") }}</p>
                </div>
              </label>

              <label
                :class="[
                  shippingMethod === 'biteship'
                    ? 'border-black ring-1 ring-black bg-white shadow-md'
                    : 'border-gray-100 bg-gray-50/50',
                ]"
                class="relative flex items-center p-6 transition-all border cursor-pointer rounded-2xl"
              >
                <input
                  type="radio"
                  value="biteship"
                  v-model="shippingMethod"
                  class="w-4 h-4 text-black border-gray-300 focus:ring-black"
                />
                <div class="flex items-center justify-between flex-grow ml-4">
                  <div>
                    <p class="text-sm font-bold tracking-wide text-gray-900 uppercase">
                      {{ $t("payment.standard") }}
                    </p>
                    <p class="mt-1 text-xs text-gray-500">
                      {{ $t("payment.powered_by_biteship") }}
                    </p>
                  </div>
                </div>
              </label>

              <div
                v-if="shippingMethod === 'biteship'"
                class="p-6 mt-4 space-y-8 bg-white border border-gray-200 rounded-3xl animate-fade-in"
              >
                <div
                  class="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 bg-gray-50 rounded-2xl"
                >
                  <div>
                    <h3
                      class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3"
                    >
                      {{ $t("payment.destination") }}
                    </h3>
                    <p class="text-xs font-bold text-gray-900 uppercase">
                      {{ destinationInfo?.name }}
                    </p>
                    <p class="mt-1 text-xs text-gray-500">
                      {{ destinationInfo?.phone }}
                    </p>
                    <p class="mt-1 text-xs text-gray-500 line-clamp-2">
                      {{ destinationInfo?.address }} -
                      {{ destinationInfo?.postal_code }}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 class="mb-4 text-sm font-bold tracking-widest uppercase">
                    {{ $t("payment.pickup_schedule") }}
                  </h3>

                  <div class="flex flex-col gap-4 mb-4 md:flex-row">
                    <label
                      :class="
                        deliveryType === 'now'
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200'
                      "
                      class="flex-1 p-4 transition border cursor-pointer rounded-xl"
                    >
                      <input
                        type="radio"
                        value="now"
                        v-model="deliveryType"
                        class="hidden"
                      />
                      <p class="text-xs font-bold uppercase">
                        {{ $t("payment.standard_pickup") }}
                      </p>
                      <p class="text-[10px] text-gray-500 mt-1">
                        {{ $t("payment.scheduled_pickup") }}
                      </p>
                    </label>
                    <label
                      :class="
                        deliveryType === 'scheduled'
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200'
                      "
                      class="flex-1 p-4 transition border cursor-pointer rounded-xl"
                    >
                      <input
                        type="radio"
                        value="scheduled"
                        v-model="deliveryType"
                        class="hidden"
                      />
                      <p class="text-xs font-bold uppercase">
                        {{ $t("payment.scheduled_pickup") }}
                      </p>
                      <p class="text-[10px] text-gray-500 mt-1">
                        {{ $t("payment.choose_specific_date_time") }}
                      </p>
                    </label>
                  </div>

                  <div
                    v-if="deliveryType === 'scheduled'"
                    class="flex gap-4 p-4 border border-blue-100 bg-blue-50/30 rounded-xl animate-fade-in"
                  >
                    <div class="flex-1">
                      <label
                        class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2"
                        >{{ $t("payment.pickup_date") }}</label
                      >
                      <input
                        type="date"
                        v-model="deliveryDate"
                        :min="todayDate"
                        class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-black focus:border-black"
                        required
                      />
                    </div>
                    <div class="flex-1">
                      <label
                        class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2"
                        >{{ $t("payment.pickup_time") }}</label
                      >
                      <input
                        type="time"
                        v-model="deliveryTime"
                        class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-black focus:border-black"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3
                    class="pt-6 mb-4 text-sm font-bold tracking-widest uppercase border-t"
                  >
                    {{ $t("payment.select_courier") }}
                  </h3>
                  <div
                    v-if="isLoadingRates"
                    class="py-4 text-sm text-center text-gray-500 animate-pulse"
                  >
                    {{ $t("payment.calculating_couriers") }}
                  </div>
                  <div
                    v-else-if="processedShippingRates.length === 0"
                    class="py-4 text-xs italic text-center text-red-500"
                  >
                    {{ $t("payment.no_courier_available") }}
                  </div>
                  <div v-else class="space-y-3">
                    <label
                      v-for="(rate, idx) in processedShippingRates"
                      :key="idx"
                      :class="[
                        rate.is_disabled
                          ? 'opacity-40 bg-gray-100 border-gray-200 pointer-events-none select-none'
                          : selectedRate?.company === rate.company &&
                            selectedRate?.type === rate.type
                          ? 'border-black bg-gray-50 shadow-sm'
                          : 'border-gray-200 hover:bg-gray-50 cursor-pointer transition-all',
                      ]"
                      class="relative flex flex-col p-4 border rounded-xl"
                    >
                      <div class="flex items-center w-full">
                        <input
                          type="radio"
                          :value="rate"
                          v-model="selectedRate"
                          :disabled="rate.is_disabled"
                          class="w-4 h-4 text-black border-gray-300 focus:ring-black disabled:opacity-50"
                        />
                        <div class="flex items-center flex-grow gap-4 ml-4">
                          <div
                            class="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0"
                          >
                            <img
                              v-show="!imageErrors[rate.company]"
                              v-if="getCourierLogo(rate.company)"
                              :src="getCourierLogo(rate.company)"
                              :alt="rate.company"
                              class="object-contain w-full h-full p-1"
                              @error="handleImageError(rate.company)"
                            />
                            <span
                              v-show="
                                imageErrors[rate.company] || !getCourierLogo(rate.company)
                              "
                              class="text-xs font-black text-gray-300"
                            >
                              {{ rate.company.toUpperCase() }}
                            </span>
                          </div>
                          <div>
                            <p
                              class="text-sm font-bold tracking-wide text-gray-800 uppercase"
                            >
                              {{ rate.company }} - {{ rate.type }}
                            </p>
                            <p class="text-gray-500 text-[10px] mt-0.5">
                              {{ rate.courier_name }} ({{ rate.duration }})
                            </p>
                          </div>
                        </div>
                        <p class="text-sm font-black text-black">
                          {{ formatPrice(rate.price) }}
                        </p>
                      </div>

                      <div
                        v-if="rate.is_disabled"
                        class="mt-3 ml-8 text-[10px] text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 font-bold uppercase tracking-widest"
                      >
                        ⚠️ {{ $t("payment.unavailable") }} {{ rate.disable_reason }}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="lg:w-[400px] space-y-6">
          <div
            class="sticky p-8 bg-white border border-gray-100 shadow-xl rounded-3xl top-28"
          >
            <h2
              class="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase border-b"
            >
              {{ $t("payment.order_summary") }}
            </h2>

            <div
              class="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar"
            >
              <div v-for="item in checkoutItems" :key="item.id" class="flex gap-4">
                <img
                  :src="item.product.image"
                  class="object-cover w-16 h-16 bg-gray-100 rounded-xl shrink-0"
                />
                <div class="flex-grow">
                  <p
                    class="font-bold text-gray-900 text-[11px] uppercase truncate w-32"
                    :title="item.product.name"
                  >
                    {{ item.product.name }}
                  </p>
                  <p
                    v-if="item.color"
                    class="text-gray-500 text-[9px] uppercase tracking-widest mt-0.5"
                  >
                    {{ $t("payment.color") }}
                    <span class="font-bold text-gray-700">{{
                      parseColorName(item.color)
                    }}</span>
                  </p>
                  <p class="text-gray-400 text-[10px]">Qty: {{ item.quantity }}</p>
                  <p class="mt-1 text-xs font-medium text-gray-900">
                    {{
                      formatPrice(
                        (item.product.discount_price ?? item.product.price) *
                          item.quantity
                      )
                    }}
                  </p>
                </div>
              </div>
            </div>

            <div class="pt-4 space-y-3 text-sm border-t border-gray-50">
              <div class="flex justify-between text-gray-500">
                <span>{{ $t("payment.total_items") }}</span>
                <span class="font-bold text-gray-900"
                  >{{ checkoutCount }} {{ $t("payment.item") }}</span
                >
              </div>
              <div class="flex justify-between text-gray-500">
                <span>{{ $t("payment.subtotal") }}</span>
                <span>{{ formatPrice(checkoutTotalAmount) }}</span>
              </div>

              <div
                v-if="userData?.is_membership"
                class="pt-4 mt-2 border-t border-gray-200 border-dashed"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p
                      class="text-[10px] font-bold text-gray-900 uppercase tracking-widest flex items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-4 h-4 text-yellow-500"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      {{ $t("payment.vip_perks") }}
                    </p>
                    <p class="text-[10px] text-gray-500 mt-0.5">
                      {{ $t("payment.use_500k") }}
                    </p>
                    <p
                      v-if="checkoutTotalAmount < MEMBER_MIN_SPEND"
                      class="text-[8px] text-red-500 italic mt-0.5"
                    >
                      {{ $t("payment.min_spend") }}
                    </p>
                  </div>

                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="useMemberVoucher"
                      @change="handleMemberToggle"
                      class="sr-only peer"
                      :disabled="
                        isVerifyingPromo ||
                        (checkoutTotalAmount < MEMBER_MIN_SPEND && !useMemberVoucher)
                      "
                    />
                    <div
                      class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black disabled:opacity-50"
                    ></div>
                  </label>
                </div>
              </div>

              <div class="pt-4 mt-2 border-t border-gray-200 border-dashed">
                <label
                  class="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2 block"
                >
                  {{ $t("payment.promo_code") }}
                </label>
                <div class="flex gap-2">
                  <input
                    type="text"
                    v-model="promoInput"
                    :disabled="
                      appliedPromoCode !== null || isVerifyingPromo || useMemberVoucher
                    "
                    :placeholder="$t('payment.enter_promo_code')"
                    class="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm uppercase focus:ring-black outline-none disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
                  />
                  <button
                    v-if="!appliedPromoCode"
                    @click="applyPromo"
                    :disabled="!promoInput || isVerifyingPromo || useMemberVoucher"
                    class="bg-black text-white text-[10px] font-bold uppercase px-4 rounded-lg hover:bg-gray-800 transition disabled:bg-gray-300 w-20 flex justify-center items-center"
                  >
                    <span v-if="!isVerifyingPromo">{{ $t("payment.apply") }}</span>
                    <div
                      v-else
                      class="w-3 h-3 border-2 rounded-full border-white/40 border-t-white animate-spin"
                    ></div>
                  </button>
                  <button
                    v-else
                    @click="removePromo"
                    class="bg-red-50 text-red-600 border border-red-200 text-[10px] font-bold uppercase px-4 rounded-lg hover:bg-red-100 transition w-20"
                  >
                    {{ $t("payment.remove") }}
                  </button>
                </div>
                <p
                  v-if="promoMessage"
                  :class="promoSuccess ? 'text-green-600' : 'text-red-500'"
                  class="text-[10px] mt-2 font-medium"
                >
                  {{ promoMessage }}
                </p>
                <div
                  v-if="appliedPromoCode"
                  class="flex items-center justify-between mt-2"
                >
                  <span
                    class="text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                    >{{ $t("payment.promo_applied") }}</span
                  >
                  <span class="text-[11px] text-green-600 font-medium"
                    >- {{ formatPrice(promoDiscountAmount) }}</span
                  >
                </div>
              </div>

              <div
                v-if="userData?.is_membership && userData?.point > 0"
                class="pt-4 mt-2 border-t border-gray-200 border-dashed"
              >
                <div class="flex items-center justify-between mb-2">
                  <span
                    class="text-[10px] font-bold text-yellow-800 uppercase tracking-widest flex items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-3 h-3 text-yellow-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    {{ $t("payment.redeem_points") }}
                  </span>
                  <span class="text-xs text-gray-500"
                    >{{ $t("payment.bal") }} {{ userData.point }} Pts</span
                  >
                </div>
                <div class="flex gap-2">
                  <input
                    type="number"
                    v-model="pointsToUse"
                    :max="maxUsablePoints"
                    min="0"
                    class="flex-1 bg-white border border-yellow-300 rounded-lg px-3 py-1.5 text-sm focus:ring-yellow-500 outline-none"
                    placeholder="0"
                  />
                  <button
                    @click="useAllPoints"
                    class="bg-yellow-100 text-yellow-800 text-[10px] font-bold uppercase px-3 rounded-lg hover:bg-yellow-200 transition"
                  >
                    {{ $t("payment.use_all") }}
                  </button>
                </div>
                <p
                  v-if="pointsToUse > 0"
                  class="text-[10px] text-green-600 mt-1 font-medium text-right"
                >
                  - {{ formatPrice(pointDiscountAmount) }}
                </p>
              </div>

              <div class="flex items-start justify-between text-gray-500">
                <span>{{ $t("payment.shipping") }}</span>
                <span v-if="shippingMethod === 'free'" class="font-bold text-green-600">{{
                  $t("payment.free")
                }}</span>
                <div
                  v-else-if="shippingMethod === 'biteship' && selectedRate"
                  class="text-right"
                >
                  <span class="block font-medium text-gray-900">{{
                    formatPrice(selectedRate.price * checkoutCount)
                  }}</span>
                  <p class="text-[10px] text-gray-400 mt-1">
                    {{ formatPrice(selectedRate.price) }} x {{ checkoutCount }}
                    {{ $t("payment.item") }}
                  </p>
                </div>
                <span v-else class="italic text-[10px]">{{
                  $t("payment.select_method")
                }}</span>
              </div>

              <div
                class="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-100"
              >
                <span class="mt-1 text-xs tracking-widest uppercase">{{
                  $t("payment.grand_total")
                }}</span>
                <span class="text-xl">{{ formatPrice(grandTotalWithDiscount) }}</span>
              </div>

              <div
                v-if="userData?.is_membership"
                class="flex items-center gap-3 p-3 mt-4 border border-yellow-100 bg-yellow-50 rounded-xl"
              >
                <div
                  class="flex items-center justify-center w-8 h-8 text-white bg-yellow-400 rounded-full shrink-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    class="text-[10px] font-bold text-yellow-800 uppercase tracking-widest"
                  >
                    {{ $t("payment.points_to_earn") }}
                  </p>
                  <p class="text-sm font-black text-yellow-600">
                    +{{ calculateEarnedPoints }} Pts
                  </p>
                </div>
              </div>
            </div>

            <button
              @click="handlePayment"
              :disabled="isButtonDisabled"
              class="mt-8 w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 py-5 rounded-2xl font-bold text-white text-xs uppercase tracking-[0.3em] transition-all duration-500 shadow-xl shadow-black/10"
            >
              <span v-if="!isProcessing">{{ $t("payment.pay_now") }}</span>
              <span v-else class="flex items-center justify-center gap-2">
                <div
                  class="w-3 h-3 border-2 rounded-full border-white/30 border-t-white animate-spin"
                ></div>
                {{ $t("payment.processing") }}
              </span>
            </button>

            <p
              v-if="!selectedAddressId"
              class="mt-4 text-[10px] text-red-500 text-center uppercase tracking-tighter"
            >
              {{ $t("payment.select_shipping_address") }}
            </p>
            <p
              v-else-if="shippingMethod === 'biteship' && !selectedRate"
              class="mt-4 text-[10px] text-red-500 text-center uppercase tracking-tighter"
            >
              {{ $t("payment.select_courier_service") }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm sm:p-6"
    >
      <div
        class="relative w-full max-w-2xl bg-white shadow-2xl rounded-3xl animate-fade-in flex flex-col max-h-[90vh] md:max-h-[85vh]"
      >
        <div
          class="flex items-center justify-between p-6 border-b border-gray-100 shrink-0 md:p-8 md:pb-6"
        >
          <h3 class="text-xl font-bold text-gray-900">
            {{ isEdit ? "Edit Address" : "Add New Address" }}
          </h3>
          <button
            @click="showModal = false"
            class="p-2 text-gray-400 transition-colors rounded-full hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="p-6 overflow-y-auto custom-scrollbar md:p-8 grow">
          <form @submit.prevent="saveAddress" class="space-y-5">
            <div
              class="flex items-center gap-3 p-3.5 border border-blue-100 bg-blue-50 rounded-xl"
            >
              <input
                type="checkbox"
                v-model="form.is_default"
                id="def"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded cursor-pointer focus:ring-blue-500"
              />
              <label
                for="def"
                class="text-sm font-medium text-blue-900 cursor-pointer select-none"
                >{{ $t("payment.default_shipping_address") }}</label
              >
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  class="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase"
                  >{{ $t("payment.first_name") }}</label
                >
                <input
                  v-model="form.first_name_address"
                  class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  class="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase"
                  >{{ $t("payment.last_name") }}</label
                >
                <input
                  v-model="form.last_name_address"
                  class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  class="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase"
                  >{{ $t("payment.province") }}</label
                >
                <select
                  v-model="form.province"
                  class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>{{ $t("payment.select_province") }}</option>
                  <option v-for="p in filteredProvinces" :key="p" :value="p">
                    {{ p }}
                  </option>
                </select>
              </div>
              <div>
                <label
                  class="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase"
                  >{{ $t("payment.city") }}</label
                >
                <input
                  v-model="form.city"
                  class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div class="relative overflow-hidden border border-gray-200 rounded-2xl">
              <div
                class="flex items-start gap-2 px-4 py-3 border-b bg-amber-50 border-amber-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="shrink-0 w-4 h-4 mt-0.5 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p class="text-[11px] text-amber-800 leading-relaxed">
                  <span class="font-bold">{{ $t("payment.pin_location") }}</span>
                  {{ $t("payment.pin_location_desc") }}
                </p>
              </div>

              <div
                class="flex flex-col items-center justify-between gap-2 p-3 border-b border-gray-200 sm:flex-row bg-gray-50"
              >
                <div class="relative w-full sm:flex-1">
                  <input
                    type="text"
                    v-model="searchQuery"
                    @input="handleSearchInput"
                    placeholder="Search area (e.g. Tunjungan Plaza)"
                    class="w-full px-3 py-2.5 text-xs transition-colors border border-gray-300 outline-none rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div
                    v-if="searchResults.length > 0"
                    class="absolute z-[999] mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-40 overflow-y-auto custom-scrollbar"
                  >
                    <div
                      v-for="(result, idx) in searchResults"
                      :key="idx"
                      @click="selectSearchResult(result)"
                      class="px-3 py-2.5 text-xs text-gray-700 border-b cursor-pointer hover:bg-blue-50 last:border-0"
                    >
                      {{ result.display_name }}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  @click="getCurrentLocation"
                  class="w-full sm:w-auto px-4 py-2.5 text-[10px] font-bold tracking-wider text-blue-700 uppercase transition-colors bg-blue-100 rounded-xl hover:bg-blue-200"
                >
                  {{ $t("payment.current_loc") }}
                </button>
              </div>

              <div class="relative z-0 w-full h-40 sm:h-56">
                <l-map
                  ref="map"
                  v-model:zoom="zoom"
                  :center="center"
                  :use-global-leaflet="false"
                  @click="onMapClick"
                >
                  <l-tile-layer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    layer-type="base"
                    name="OpenStreetMap"
                  ></l-tile-layer>
                  <l-marker
                    :lat-lng="markerLatLng"
                    draggable
                    @update:latLng="onMarkerDrag"
                  ></l-marker>
                </l-map>
                <div
                  class="absolute z-[400] px-2 py-1 font-mono text-[9px] text-gray-600 bg-white/90 rounded shadow bottom-2 right-2 backdrop-blur pointer-events-none border border-gray-200"
                >
                  {{ form.latitude ? parseFloat(form.latitude).toFixed(5) : "-" }},
                  {{ form.longitude ? parseFloat(form.longitude).toFixed(5) : "-" }}
                </div>
              </div>
            </div>

            <div>
              <label
                class="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase"
                >{{ $t("payment.complete_address") }}</label
              >
              <textarea
                v-model="form.address_location"
                rows="3"
                placeholder="Street name, building, house number..."
                class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none resize-none bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 custom-scrollbar"
                required
              ></textarea>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  class="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase"
                  >{{ $t("payment.details") }}</label
                >
                <input
                  v-model="form.location_type"
                  placeholder="Apartment, suite, block"
                  class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  class="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase"
                  >{{ $t("payment.postal_code") }}</label
                >
                <input
                  v-model="form.postal_code"
                  placeholder="Postal code"
                  class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div class="h-2"></div>
          </form>
        </div>

        <div
          class="flex items-center justify-between p-6 border-t border-gray-100 shrink-0 md:p-8 md:pt-5 bg-gray-50/50"
        >
          <button
            v-if="isEdit"
            type="button"
            @click="deleteAddress"
            class="text-xs font-bold tracking-widest text-red-500 uppercase transition-colors hover:text-red-700"
          >
            {{ $t("payment.delete") }}
          </button>
          <div v-else></div>
          <div class="flex gap-3">
            <button
              type="button"
              @click="showModal = false"
              class="px-5 py-2.5 text-sm font-bold text-gray-600 transition-colors bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hidden sm:block"
            >
              {{ $t("payment.cancel") }}
            </button>
            <button
              type="button"
              @click="saveAddress"
              class="px-6 py-2.5 text-sm font-bold text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md shadow-blue-500/20"
            >
              {{ $t("payment.save_address") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, nextTick } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { useCart } from "../../composables/useCart.js";
import { Country, State } from "country-state-city";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";

import { formatPrice } from "../../utils/currency";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

const router = useRouter();

const getAxiosConfig = () => {
  return {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
};

const {
  cartItems,
  checkoutCount,
  checkoutTotalAmount,
  selectedItemIds,
  clearSelectedCart,
} = useCart();

const userData = ref(null);
const addresses = ref([]);
const selectedAddressId = ref(null);
const isProcessing = ref(false);
const shippingMethod = ref("free");
const selectedRate = ref(null);
const isLoadingRates = ref(false);
const deliveryType = ref("now");
const deliveryDate = ref("");
const deliveryTime = ref("");
const pointsToUse = ref(0);
const pointConversionRate = 1000;
const promoInput = ref("");
const appliedPromoCode = ref(null);
const promoDiscountAmount = ref(0);
const promoMessage = ref("");
const promoSuccess = ref(false);
const isVerifyingPromo = ref(false);
const rawShippingRates = ref([]);
const isPageLoading = ref(true);

// ==========================================
// [BARU] STATE UNTUK TOGGLE MEMBER VOUCHER
// ==========================================
const useMemberVoucher = ref(false);
const MEMBER_VOUCHER_CODE = "SOLHERMEMBER"; // Kode Universal
const MEMBER_MIN_SPEND = 1000000;

// Logika saat Toggle dihidupkan / dimatikan
const handleMemberToggle = async () => {
  if (useMemberVoucher.value) {
    // Validasi Minimal Belanja
    if (checkoutTotalAmount.value < MEMBER_MIN_SPEND) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "warning",
        title: `Min. spend to use member voucher is Rp ${MEMBER_MIN_SPEND.toLocaleString(
          "id-ID"
        )}`,
        showConfirmButton: false,
        timer: 3000,
      });
      // Batalkan toggle
      useMemberVoucher.value = false;
      return;
    }

    // Auto-isi dan apply promo
    promoInput.value = MEMBER_VOUCHER_CODE;
    await applyPromo();

    // Jika gagal apply (misal backend membalas: sudah dipakai), matikan toggle
    if (!promoSuccess.value) {
      useMemberVoucher.value = false;
    }
  } else {
    // Jika dimatikan, dan yang sedang aktif adalah kode member, maka remove
    if (appliedPromoCode.value === MEMBER_VOUCHER_CODE) {
      removePromo();
    }
  }
};

const trackGtmEvent = (eventName, data) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...data,
  });
};

const formatCartItemsForGtm = () => {
  return checkoutItems.value.map((item) => ({
    item_id: item.product.id,
    item_name: item.product.name,
    price: item.product.discount_price || item.product.price,
    item_variant: parseColorName(item.color),
    quantity: item.quantity,
  }));
};

const shipperInfo = {
  name: "Solher Store",
  phone: "08883888585",
  address: "Jalan Wijaya Kusuma No.57, Kota Surabaya, Jawa Timur 60272, Indonesia",
  postal_code: "60272",
};

const totalQuantityToCheckout = computed(() => {
  return checkoutItems.value.reduce((sum, item) => sum + item.quantity, 0);
});

const getDistanceFromOrigin = (destLat, destLng) => {
  if (!destLat || !destLng) return 999;
  const lat1 = -7.25653;
  const lon1 = 112.74877;
  const lat2 = parseFloat(destLat);
  const lon2 = parseFloat(destLng);
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

const processedShippingRates = computed(() => {
  if (!rawShippingRates.value || rawShippingRates.value.length === 0) return [];
  let checkHour = new Date().getHours();
  if (deliveryType.value === "scheduled" && deliveryTime.value) {
    if (deliveryDate.value === todayDate.value) {
      checkHour = parseInt(deliveryTime.value.split(":")[0]);
    } else {
      checkHour = 12;
    }
  } else {
    checkHour = new Date().getHours();
  }

  const totalWeightKg = totalQuantityToCheckout.value || 1;
  let distanceKm = 999;
  if (addresses.value && selectedAddressId.value) {
    const destInfo = addresses.value.find((a) => a.id === selectedAddressId.value);
    if (destInfo && destInfo.details.latitude && destInfo.details.longitude) {
      distanceKm = getDistanceFromOrigin(
        destInfo.details.latitude,
        destInfo.details.longitude
      );
    }
  }

  const rates = rawShippingRates.value.map((rate) => {
    let is_disabled = false;
    let disable_reason = "";
    const type = rate.type ? rate.type.toLowerCase().replace(/_/g, " ") : "";
    const company = rate.company ? rate.company.toLowerCase() : "";

    if (company === "gojek" || company === "grab") {
      if (distanceKm > 40) {
        is_disabled = true;
        disable_reason = `Jarak > 40km (${distanceKm.toFixed(1)}km)`;
      }
    }
    if (!is_disabled && company === "gojek") {
      if (type.includes("same day") || type.includes("sameday")) {
        if (checkHour >= 15 || checkHour < 6) {
          is_disabled = true;
          disable_reason = "Tutup. Operasional 06:00 - 15:00";
        } else if (totalWeightKg > 7) {
          is_disabled = true;
          disable_reason = "Berat Maks 7kg";
        }
      } else if (type.includes("instant")) {
        if (checkHour >= 17 || checkHour < 6) {
          is_disabled = true;
          disable_reason = "Tutup. Operasional 06:00 - 17:00";
        } else if (totalWeightKg > 20) {
          is_disabled = true;
          disable_reason = "Berat Maks 20kg";
        }
      }
    } else if (!is_disabled && company === "grab") {
      if (type.includes("same day") || type.includes("sameday")) {
        if (checkHour >= 14 || checkHour < 9) {
          is_disabled = true;
          disable_reason = "Tutup. Operasional 09:00 - 14:00";
        } else if (totalWeightKg > 7) {
          is_disabled = true;
          disable_reason = "Berat Maks 7kg";
        }
      } else if (type.includes("instant")) {
        if (checkHour >= 18 || checkHour < 8) {
          is_disabled = true;
          disable_reason = "Tutup. Operasional 08:00 - 18:00";
        } else if (totalWeightKg > 20) {
          is_disabled = true;
          disable_reason = "Berat Maks 20kg";
        }
      }
    }
    return { ...rate, is_disabled, disable_reason };
  });

  return [...rates].sort((a, b) => {
    if (a.is_disabled === b.is_disabled) return 0;
    return a.is_disabled ? 1 : -1;
  });
});

// const applyPromo = async () => {
//   if (!promoInput.value) return;
//   isVerifyingPromo.value = true;
//   try {
//     const res = await axios.post(
//       `${BASE_URL}/promo/verify`,
//       { promo_code: promoInput.value },
//       getAxiosConfig()
//     );
//     if (checkoutTotalAmount.value < 50000)
//       throw new Error("Minimum spend for this promo is Rp 50.000");
//     promoSuccess.value = true;
//     promoMessage.value = "✅ " + res.data.message;
//     appliedPromoCode.value = promoInput.value.toUpperCase();
//     promoDiscountAmount.value = Math.min(
//       res.data.discount_value,
//       checkoutTotalAmount.value
//     );

//     // [BARU] Sinkronisasi toggle jika promo yang berhasil diapply adalah voucher member
//     if (appliedPromoCode.value === MEMBER_VOUCHER_CODE) {
//       useMemberVoucher.value = true;
//     }

//     if (pointsToUse.value > maxUsablePoints.value)
//       pointsToUse.value = maxUsablePoints.value;
//   } catch (error) {
//     promoSuccess.value = false;
//     let errorMessage = "Invalid promo code.";
//     if (error.response && error.response.data && error.response.data.message)
//       errorMessage = error.response.data.message;
//     else if (error.message) errorMessage = error.message;
//     promoMessage.value = "❌ " + errorMessage;
//     appliedPromoCode.value = null;
//     promoDiscountAmount.value = 0;
//   } finally {
//     isVerifyingPromo.value = false;
//   }
// };

const applyPromo = async () => {
  // if (!promoInput.value) return;
  // isVerifyingPromo.value = true;

  // try {
  //   const codeToBeApplied = promoInput.value.toUpperCase();

  //   // [PERBAIKAN PRESISI] Validasi cerdas di sisi frontend sebelum menembak API backend
  //   if (codeToBeApplied === MEMBER_VOUCHER_CODE && checkoutTotalAmount.value < MEMBER_MIN_SPEND) {
  //     throw new Error(`Minimum spend to use VIP Voucher is Rp ${MEMBER_MIN_SPEND.toLocaleString('id-ID')}`);
  //   } else if (checkoutTotalAmount.value < 50000) {
  //     throw new Error("Minimum spend for general promo is Rp 50.000");
  //   }

  //   const res = await axios.post(
  //     `${BASE_URL}/promo/verify`,
  //     { promo_code: codeToBeApplied },
  //     getAxiosConfig()
  //   );

  if (!promoInput.value) return;
  isVerifyingPromo.value = true;

  try {
    const codeToBeApplied = promoInput.value.toUpperCase();

    // Kirim checkoutItems agar backend bisa cek diskon
    const res = await axios.post(
      `${BASE_URL}/promo/verify`,
      {
        promo_code: codeToBeApplied,
        cart_items: checkoutItems.value.map((item) => ({
          product_id: item.product_id,
        })),
      },
      getAxiosConfig()
    );

    // [PERBAIKAN PRESISI] Pembedaan Limit Minimum Belanja
    if (
      codeToBeApplied === MEMBER_VOUCHER_CODE &&
      checkoutTotalAmount.value < MEMBER_MIN_SPEND
    ) {
      throw new Error(
        `Minimum spend to use VIP Voucher is Rp ${MEMBER_MIN_SPEND.toLocaleString(
          "id-ID"
        )}`
      );
    } else if (
      codeToBeApplied !== MEMBER_VOUCHER_CODE &&
      checkoutTotalAmount.value < 499000
    ) {
      // [BARU] Aturan ketat dari bos untuk First Order Voucher!
      throw new Error("Minimum spend for First Order promo is Rp 1.899.000");
    }

    // const res = await axios.post(
    //   `${BASE_URL}/promo/verify`,
    //   { promo_code: codeToBeApplied },
    //   getAxiosConfig()
    // );

    promoSuccess.value = true;
    promoMessage.value = "✅ " + res.data.message;
    appliedPromoCode.value = codeToBeApplied;
    promoDiscountAmount.value = Math.min(
      res.data.discount_value,
      checkoutTotalAmount.value
    );

    // Sinkronisasi toggle jika promo yang berhasil diapply adalah voucher member
    if (appliedPromoCode.value === MEMBER_VOUCHER_CODE) {
      useMemberVoucher.value = true;
    }

    // Koreksi penggunaan poin agar tidak melebihi sisa tagihan
    if (pointsToUse.value > maxUsablePoints.value) {
      pointsToUse.value = maxUsablePoints.value;
    }
  } catch (error) {
    promoSuccess.value = false;
    let errorMessage = "Invalid promo code.";
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    promoMessage.value = "❌ " + errorMessage;
    appliedPromoCode.value = null;
    promoDiscountAmount.value = 0;

    // Matikan toggle jika terjadi kegagalan (fallback aman)
    useMemberVoucher.value = false;
  } finally {
    isVerifyingPromo.value = false;
  }
};

const removePromo = () => {
  promoInput.value = "";
  appliedPromoCode.value = null;
  promoDiscountAmount.value = 0;
  promoMessage.value = "";
  promoSuccess.value = false;
  useMemberVoucher.value = false; // [BARU] Matikan toggle jika promo dihapus
};

const initDateTime = () => {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  deliveryDate.value = now.toISOString().split("T")[0];
  deliveryTime.value =
    now.toTimeString().split(":")[0] + ":" + now.toTimeString().split(":")[1];
};

const todayDate = computed(() => new Date().toISOString().split("T")[0]);

const destinationInfo = computed(() => {
  if (!selectedAddressId.value || !addresses.value) return null;
  const addr = addresses.value.find((a) => a.id === selectedAddressId.value);
  if (!addr) return null;
  return {
    name: addr.receiver.full_name,
    phone: userData.value?.phone || "No Phone Provided",
    address: `${addr.details.location}, ${addr.details.city}, ${addr.details.province}`,
    postal_code: addr.details.postal_code,
  };
});

const grandTotal = computed(() => {
  let total = checkoutTotalAmount.value;
  if (shippingMethod.value === "biteship" && selectedRate.value)
    total += parseFloat(selectedRate.value.price) * checkoutCount.value;
  return total;
});

const imageErrors = ref({});
const handleImageError = (company) => {
  imageErrors.value[company] = true;
};
const getCourierLogo = (company) => {
  const baseUrl = "/courier_images/";
  const map = {
    jne: "jne.png",
    sicepat: "sicepat.png",
    jnt: "jnt.png",
    anteraja: "anteraja.png",
    gojek: "gojek.png",
    grab: "grab.png",
    paxel: "paxel.png",
    ninja: "ninja.png",
  };
  const logo = map[company.toLowerCase()];
  return logo ? baseUrl + logo : null;
};

const isButtonDisabled = computed(() => {
  if (isProcessing.value || cartItems.value.length === 0 || !selectedAddressId.value)
    return true;
  if (shippingMethod.value === "biteship") {
    if (!selectedRate.value) return true;
    if (
      deliveryType.value === "scheduled" &&
      (!deliveryDate.value || !deliveryTime.value)
    )
      return true;
  }
  return false;
});

watch(selectedAddressId, async (newVal) => {
  if (newVal) {
    if (!selectedItemIds.value || selectedItemIds.value.length === 0) return;
    selectedRate.value = null;
    isLoadingRates.value = true;
    rawShippingRates.value = [];
    try {
      const res = await axios.post(
        `${BASE_URL}/shipping/rates`,
        { address_id: newVal, cart_ids: selectedItemIds.value },
        getAxiosConfig()
      );
      if (res.data && res.data.pricing) rawShippingRates.value = res.data.pricing;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return Swal.fire("Session Expired", "Please login again.", "warning").then(() =>
          router.push("/login")
        );
      }
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to calculate shipping.",
        showConfirmButton: false,
        timer: 4000,
      });
    } finally {
      isLoadingRates.value = false;
    }
  }
});

watch(
  processedShippingRates,
  (newRates) => {
    if (selectedRate.value) {
      const match = newRates.find(
        (r) =>
          r.company === selectedRate.value.company && r.type === selectedRate.value.type
      );
      if (match && match.is_disabled) selectedRate.value = null;
    }
  },
  { deep: true }
);

watch(shippingMethod, (newVal) => {
  if (newVal === "free") selectedRate.value = null;
});
watch(deliveryType, (newVal) => {
  if (newVal === "now") initDateTime();
});

const showModal = ref(false);
const countries = ref(Country.getAllCountries());
const filteredProvinces = ref([]);
const form = ref({
  id: null,
  region: "Indonesia",
  first_name_address: "",
  last_name_address: "",
  address_location: "",
  location_type: "",
  city: "",
  province: "",
  postal_code: "",
  latitude: null,
  longitude: null,
  is_default: true,
});
const map = ref(null);
const zoom = ref(13);
const center = ref([-7.250445, 112.768845]);
const markerLatLng = ref([-7.250445, 112.768845]);
const searchQuery = ref("");
const searchResults = ref([]);
let debounceTimeout = null;

const fetchProvinces = () => {
  const selectedCountry = countries.value.find((c) => c.name === form.value.region);
  if (selectedCountry)
    filteredProvinces.value = State.getStatesOfCountry(selectedCountry.isoCode).map(
      (s) => s.name
    );
};

const openModal = () => {
  form.value = {
    region: "Indonesia",
    is_default: true,
    first_name_address: userData.value?.first_name || "",
    last_name_address: userData.value?.last_name || "",
    address_location: "",
    location_type: "",
    city: "",
    province: "",
    postal_code: "",
    latitude: null,
    longitude: null,
  };
  center.value = [-7.250445, 112.768845];
  markerLatLng.value = [-7.250445, 112.768845];
  fetchProvinces();
  showModal.value = true;
};

const reverseGeocode = async (lat, lng) => {
  try {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    if (res.data && res.data.display_name) {
      form.value.address_location = res.data.display_name;
      if (res.data.address && res.data.address.postcode)
        form.value.postal_code = res.data.address.postcode;
    }
  } catch (error) {
    console.error("Reverse Geocode Error", error);
  }
};

const handleSearchInput = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  if (searchQuery.value.length < 3) {
    searchResults.value = [];
    return;
  }
  debounceTimeout = setTimeout(async () => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery.value}&countrycodes=id&limit=5`
      );
      searchResults.value = res.data;
    } catch (error) {}
  }, 500);
};

const selectSearchResult = (result) => {
  const lat = parseFloat(result.lat);
  const lng = parseFloat(result.lon);
  if (map.value && map.value.leafletObject) map.value.leafletObject.flyTo([lat, lng], 16);
  else {
    center.value = [lat, lng];
    zoom.value = 16;
  }
  markerLatLng.value = [lat, lng];
  form.value.latitude = lat.toString();
  form.value.longitude = lng.toString();
  form.value.address_location = result.display_name;
  searchResults.value = [];
  searchQuery.value = "";
};

const onMapClick = (event) => {
  const { lat, lng } = event.latlng;
  updateLocation(lat, lng);
};
const onMarkerDrag = (event) => {
  const { lat, lng } = event.target.getLatLng();
  updateLocation(lat, lng);
};
const updateLocation = (lat, lng) => {
  markerLatLng.value = [lat, lng];
  form.value.latitude = lat.toString();
  form.value.longitude = lng.toString();
  reverseGeocode(lat, lng);
};

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        if (map.value && map.value.leafletObject)
          map.value.leafletObject.flyTo([lat, lng], 16);
        else {
          center.value = [lat, lng];
          zoom.value = 16;
        }
        updateLocation(lat, lng);
      },
      () => Swal.fire("Error", "Please allow location access.", "error")
    );
  }
};

const saveAddress = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/addresses`, form.value, getAxiosConfig());
    showModal.value = false;
    const resAddr = await axios.get(`${BASE_URL}/addresses`, getAxiosConfig());
    addresses.value = resAddr.data.data;
    selectedAddressId.value =
      res.data.id || res.data.data?.id || addresses.value[addresses.value.length - 1].id;
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Address Added!",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (e) {
    Swal.fire("Error", "Failed to save address", "error");
  }
};

const fetchData = async () => {
  try {
    const user = localStorage.getItem("user");
    if (user) userData.value = JSON.parse(user);
    const resAddr = await axios.get(`${BASE_URL}/addresses`, getAxiosConfig());
    addresses.value = resAddr.data.data;
    if (addresses.value.length > 0) {
      const defaultAddr = addresses.value.find((a) => a.is_default);
      selectedAddressId.value = defaultAddr ? defaultAddr.id : addresses.value[0].id;
    }
    initDateTime();
    isPageLoading.value = false;
    await nextTick();
    if (checkoutItems.value.length > 0) {
      trackGtmEvent("add_payment_info", {
        ecommerce: {
          currency: "IDR",
          value: checkoutTotalAmount.value,
          items: formatCartItemsForGtm(),
        },
      });
    }
    if (addresses.value.length === 0) {
      Swal.fire({
        title: "Address Required",
        text: "You must add a shipping address before you can proceed.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Add Address Now",
        cancelButtonText: "Later",
        confirmButtonColor: "#000",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) openModal();
      });
    }
  } catch (error) {
    isPageLoading.value = false;
    if (error.response && error.response.status === 401) {
      router.push("/login");
    } else {
      Swal.fire("Error", "Failed to load checkout data", "error");
    }
  }
};

const maxUsablePoints = computed(() => {
  if (!userData.value || checkoutTotalAmount.value === 0) return 0;
  const userBalance = userData.value.point || 0;
  const priceAfterPromo = checkoutTotalAmount.value - promoDiscountAmount.value;
  const maxPointsForPrice = Math.floor(
    Math.max(0, priceAfterPromo) / pointConversionRate
  );
  return Math.min(userBalance, maxPointsForPrice);
});

const pointDiscountAmount = computed(
  () => (pointsToUse.value || 0) * pointConversionRate
);
const useAllPoints = () => {
  pointsToUse.value = maxUsablePoints.value;
};
watch(pointsToUse, (newVal) => {
  if (newVal < 0) pointsToUse.value = 0;
  if (newVal > maxUsablePoints.value) pointsToUse.value = maxUsablePoints.value;
});

const grandTotalWithDiscount = computed(() => {
  return grandTotal.value - promoDiscountAmount.value - pointDiscountAmount.value;
});

const parseColorName = (colorString) => {
  if (!colorString) return "";
  return colorString.includes("|") ? colorString.split("|")[0] : colorString;
};

const handlePayment = async () => {
  isProcessing.value = true;
  try {
    const activeCurrency = localStorage.getItem("currency") || "IDR";

    const payload = {
      address_id: selectedAddressId.value,
      shipping_method: shippingMethod.value,
      use_points: pointsToUse.value,
      cart_ids: selectedItemIds.value,
      courier_company:
        shippingMethod.value === "biteship" ? selectedRate.value?.company : null,
      courier_type: shippingMethod.value === "biteship" ? selectedRate.value?.type : null,
      shipping_cost:
        shippingMethod.value === "biteship" ? selectedRate.value?.price : null,
      delivery_type: shippingMethod.value === "biteship" ? deliveryType.value : null,
      delivery_date: shippingMethod.value === "biteship" ? deliveryDate.value : null,
      delivery_time: shippingMethod.value === "biteship" ? deliveryTime.value : null,
      promo_code: appliedPromoCode.value,

      // [BARU] Kirimkan mata uang ke backend Laravel
      currency: activeCurrency,
    };
    const res = await axios.post(`${BASE_URL}/checkout`, payload, getAxiosConfig());
    if (res.data.checkout_url) {
      trackGtmEvent("purchase", {
        ecommerce: {
          transaction_id: res.data.order_id || res.data.invoice_id || `ORD-${Date.now()}`,
          affiliation: "Solher Web Store",
          value: grandTotalWithDiscount.value,
          currency: "IDR",
          coupon: appliedPromoCode.value || "",
          shipping: shippingMethod.value === "biteship" ? selectedRate.value?.price : 0,
          items: formatCartItemsForGtm(),
        },
      });

      clearSelectedCart();
      window.location.href = res.data.checkout_url;
    }
  } catch (error) {
    Swal.fire(
      "Payment Error",
      error.response?.data?.message || "Failed to create invoice",
      "error"
    );
  } finally {
    isProcessing.value = false;
  }
};

const calculateEarnedPoints = computed(() =>
  Math.floor(checkoutTotalAmount.value / 100000)
);
const checkoutItems = computed(() =>
  cartItems.value.filter((item) => selectedItemIds.value.includes(item.id))
);
// const formatPrice = (v) =>
//   new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 0,
//   }).format(v);

onMounted(fetchData);
</script>

<style scoped>
/* CSS Keyframes untuk Animasi Bouncing Dots */
.animate-bounce-1 {
  animation: bounceDots 1.4s infinite ease-in-out both;
  animation-delay: -0.32s;
}
.animate-bounce-2 {
  animation: bounceDots 1.4s infinite ease-in-out both;
  animation-delay: -0.16s;
}
.animate-bounce-3 {
  animation: bounceDots 1.4s infinite ease-in-out both;
}

@keyframes bounceDots {
  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style> -->

<!-- <template>
  <div
    v-if="isPageLoading"
    class="z-[100] fixed inset-0 flex flex-col justify-center items-center bg-white"
  >
    <div class="flex gap-2 mb-4">
      <div class="w-3 h-3 bg-black rounded-full animate-bounce-1"></div>
      <div class="w-3 h-3 bg-black rounded-full animate-bounce-2"></div>
      <div class="w-3 h-3 bg-black rounded-full animate-bounce-3"></div>
    </div>
    <p class="font-serif text-sm italic tracking-widest text-gray-500 animate-pulse">
      {{ $t("payment.prepare_checkout") }}
    </p>
  </div>

  <div v-else class="max-w-6xl min-h-screen px-6 py-12 mx-auto md:py-24 animate-fade-in">
    <div v-if="checkoutItems.length === 0" class="py-20 text-center">
      <h2 class="mb-4 font-serif text-3xl">{{ $t("payment.bag_empty") }}</h2>
      <button
        @click="$router.push('/collections')"
        class="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase bg-black rounded-full"
      >
        {{ $t("payment.return_shop") }}
      </button>
    </div>

    <div v-else>
      <h1 class="mb-12 font-serif text-3xl tracking-tighter uppercase md:text-4xl">
        {{ $t("payment.checkout") }}
      </h1>

      <div class="flex flex-col gap-12 lg:flex-row">
        <div class="flex-grow space-y-12">
          <section>
            <div class="flex items-center gap-4 mb-4">
              <span
                class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
                >1</span
              >
              <h2 class="text-sm font-bold tracking-widest text-gray-900 uppercase">
                {{ $t("payment.shipping_address") }}
              </h2>
            </div>

            <div
              v-if="addresses.length === 0"
              class="py-10 text-center border border-gray-300 border-dashed bg-gray-50 rounded-2xl"
            >
              <p class="mb-2 text-sm italic text-gray-500">
                {{ $t("payment.no_address_found") }}
              </p>
              <button
                @click="openModal()"
                class="text-xs font-bold text-blue-600 underline"
              >
                {{ $t("payment.add_new_address") }}
              </button>
            </div>
            <div v-else class="space-y-4">
              <label
                v-for="addr in addresses"
                :key="addr.id"
                :class="[
                  selectedAddressId === addr.id
                    ? 'border-black ring-1 ring-black bg-white shadow-md'
                    : 'border-gray-100 bg-gray-50/50',
                ]"
                class="relative flex items-start p-6 transition-all border cursor-pointer rounded-2xl hover:bg-white"
              >
                <input
                  type="radio"
                  name="address"
                  :value="addr.id"
                  v-model="selectedAddressId"
                  class="w-4 h-4 mt-1 text-black border-gray-300 focus:ring-black"
                />
                <div class="flex-grow ml-4">
                  <div class="flex justify-between">
                    <p class="text-sm font-bold text-gray-900 uppercase">
                      {{ addr.receiver.full_name }}
                    </p>
                    <span
                      v-if="addr.is_default"
                      class="text-[9px] bg-gray-200 px-2 py-0.5 rounded font-bold uppercase"
                      >{{ $t("payment.default") }}</span
                    >
                  </div>
                  <p class="mt-2 text-sm leading-relaxed text-gray-600">
                    {{ addr.details.location }}, {{ addr.details.type }} <br />
                    {{ addr.details.city }}, {{ addr.details.province }} <br />
                    {{ addr.details.region }} - {{ addr.details.postal_code }}
                  </p>
                </div>
              </label>
              <button
                @click="openModal()"
                class="mt-4 text-xs font-bold text-gray-500 underline hover:text-black"
              >
                {{ $t("payment.add_another_address") }}
              </button>
            </div>
          </section>

          <section v-if="!selectedAddressId">
            <div class="flex items-center gap-4 mb-4">
              <span
                class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
                >2</span
              >
              <h2 class="text-sm font-bold tracking-widest text-gray-900 uppercase">
                {{ $t("payment.shipping_method") }}
              </h2>
            </div>

            <div>
              <h4 class="text-sm tracking-widest text-gray-900 uppercase">
                {{ $t("payment.choose_shipping_address") }}
              </h4>
            </div>
          </section>

          <section v-if="selectedAddressId">
            <div class="flex items-center gap-4 mb-4">
              <span
                class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
                >2</span
              >
              <h2 class="text-sm font-bold tracking-widest text-gray-900 uppercase">
                {{ $t("payment.shipping_method") }}
              </h2>
            </div>

            <div class="space-y-4">
              <label
                v-if="destinationInfo?.country === 'Indonesia'"
                :class="[
                  shippingMethod === 'free'
                    ? 'border-black ring-1 ring-black bg-white shadow-md'
                    : 'border-gray-100 bg-gray-50/50',
                ]"
                class="relative flex items-center p-6 transition-all border cursor-pointer rounded-2xl"
              >
                <input
                  type="radio"
                  value="free"
                  v-model="shippingMethod"
                  class="w-4 h-4 text-black border-gray-300 focus:ring-black"
                />
                <div class="flex items-center justify-between flex-grow ml-4">
                  <div>
                    <p class="text-sm font-bold tracking-wide text-gray-900 uppercase">
                      {{ $t("payment.free_shipping") }}
                    </p>
                    <p class="mt-1 text-xs font-bold text-green-600">
                      {{ $t("payment.in_store") }}
                    </p>
                  </div>
                  <p class="font-black text-black">{{ $t("payment.price") }}</p>
                </div>
              </label>

              <label
                :class="[
                  shippingMethod === 'biteship'
                    ? 'border-black ring-1 ring-black bg-white shadow-md'
                    : 'border-gray-100 bg-gray-50/50',
                ]"
                class="relative flex items-center p-6 transition-all border cursor-pointer rounded-2xl"
              >
                <input
                  type="radio"
                  value="biteship"
                  v-model="shippingMethod"
                  class="w-4 h-4 text-black border-gray-300 focus:ring-black"
                />
                <div class="flex items-center justify-between flex-grow ml-4">
                  <div>
                    <p class="text-sm font-bold tracking-wide text-gray-900 uppercase">
                      {{ $t("payment.standard") }}
                    </p>
                    <p class="mt-1 text-xs text-gray-500">
                      {{
                        destinationInfo?.country === "Indonesia"
                          ? $t("payment.powered_by_biteship")
                          : "International Express Delivery"
                      }}
                    </p>
                  </div>
                </div>
              </label>

              <div
                v-if="shippingMethod === 'biteship'"
                class="p-6 mt-4 space-y-8 bg-white border border-gray-200 rounded-3xl animate-fade-in"
              >
                <div
                  class="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 bg-gray-50 rounded-2xl"
                >
                  <div>
                    <h3
                      class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3"
                    >
                      {{ $t("payment.destination") }}
                    </h3>
                    <p class="text-xs font-bold text-gray-900 uppercase">
                      {{ destinationInfo?.name }}
                    </p>
                    <p class="mt-1 text-xs text-gray-500">
                      {{ destinationInfo?.phone }}
                    </p>
                    <p class="mt-1 text-xs text-gray-500 line-clamp-2">
                      {{ destinationInfo?.address }} -
                      {{ destinationInfo?.postal_code }}
                    </p>
                    <p class="mt-1 text-xs font-bold text-blue-600 uppercase">
                      {{ destinationInfo?.country }}
                    </p>
                  </div>
                </div>

                <div v-if="destinationInfo?.country === 'Indonesia'">
                  <h3 class="mb-4 text-sm font-bold tracking-widest uppercase">
                    {{ $t("payment.pickup_schedule") }}
                  </h3>

                  <div class="flex flex-col gap-4 mb-4 md:flex-row">
                    <label
                      :class="
                        deliveryType === 'now'
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200'
                      "
                      class="flex-1 p-4 transition border cursor-pointer rounded-xl"
                    >
                      <input
                        type="radio"
                        value="now"
                        v-model="deliveryType"
                        class="hidden"
                      />
                      <p class="text-xs font-bold uppercase">
                        {{ $t("payment.standard_pickup") }}
                      </p>
                      <p class="text-[10px] text-gray-500 mt-1">
                        {{ $t("payment.scheduled_pickup") }}
                      </p>
                    </label>
                    <label
                      :class="
                        deliveryType === 'scheduled'
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200'
                      "
                      class="flex-1 p-4 transition border cursor-pointer rounded-xl"
                    >
                      <input
                        type="radio"
                        value="scheduled"
                        v-model="deliveryType"
                        class="hidden"
                      />
                      <p class="text-xs font-bold uppercase">
                        {{ $t("payment.scheduled_pickup") }}
                      </p>
                      <p class="text-[10px] text-gray-500 mt-1">
                        {{ $t("payment.choose_specific_date_time") }}
                      </p>
                    </label>
                  </div>

                  <div
                    v-if="deliveryType === 'scheduled'"
                    class="flex gap-4 p-4 border border-blue-100 bg-blue-50/30 rounded-xl animate-fade-in"
                  >
                    <div class="flex-1">
                      <label
                        class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2"
                        >{{ $t("payment.pickup_date") }}</label
                      >
                      <input
                        type="date"
                        v-model="deliveryDate"
                        :min="todayDate"
                        class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-black focus:border-black"
                        required
                      />
                    </div>
                    <div class="flex-1">
                      <label
                        class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2"
                        >{{ $t("payment.pickup_time") }}</label
                      >
                      <input
                        type="time"
                        v-model="deliveryTime"
                        class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-black focus:border-black"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3
                    class="pt-6 mb-4 text-sm font-bold tracking-widest uppercase border-t"
                  >
                    {{ $t("payment.select_courier") }}
                  </h3>
                  <div
                    v-if="isLoadingRates"
                    class="py-4 text-sm text-center text-gray-500 animate-pulse"
                  >
                    {{ $t("payment.calculating_couriers") }}
                  </div>
                  <div
                    v-else-if="processedShippingRates.length === 0"
                    class="py-4 text-xs italic text-center text-red-500"
                  >
                    {{ $t("payment.no_courier_available") }}
                  </div>
                  <div v-else class="space-y-3">
                    <label
                      v-for="(rate, idx) in processedShippingRates"
                      :key="idx"
                      :class="[
                        rate.is_disabled
                          ? 'opacity-40 bg-gray-100 border-gray-200 pointer-events-none select-none'
                          : selectedRate?.company === rate.company &&
                            selectedRate?.type === rate.type
                          ? 'border-black bg-gray-50 shadow-sm'
                          : 'border-gray-200 hover:bg-gray-50 cursor-pointer transition-all',
                      ]"
                      class="relative flex flex-col p-4 border rounded-xl"
                    >
                      <div class="flex items-center w-full">
                        <input
                          type="radio"
                          :value="rate"
                          v-model="selectedRate"
                          :disabled="rate.is_disabled"
                          class="w-4 h-4 text-black border-gray-300 focus:ring-black disabled:opacity-50"
                        />
                        <div class="flex items-center flex-grow gap-4 ml-4">
                          <div
                            class="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0"
                          >
                            <img
                              v-show="!imageErrors[rate.company]"
                              v-if="getCourierLogo(rate.company)"
                              :src="getCourierLogo(rate.company)"
                              :alt="rate.company"
                              class="object-contain w-full h-full p-1"
                              @error="handleImageError(rate.company)"
                            />
                            <span
                              v-show="
                                imageErrors[rate.company] || !getCourierLogo(rate.company)
                              "
                              class="text-xs font-black text-gray-300"
                            >
                              {{ rate.company.toUpperCase() }}
                            </span>
                          </div>
                          <div>
                            <p
                              class="text-sm font-bold tracking-wide text-gray-800 uppercase"
                            >
                              {{ rate.company }} - {{ rate.type.replace("_", " ") }}
                            </p>
                            <p class="text-gray-500 text-[10px] mt-0.5">
                              {{ rate.courier_name }} ({{ rate.duration }})
                            </p>
                          </div>
                        </div>
                        <p class="text-sm font-black text-black">
                          {{ formatPrice(rate.price) }}
                        </p>
                      </div>

                      <div
                        v-if="rate.is_disabled"
                        class="mt-3 ml-8 text-[10px] text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 font-bold uppercase tracking-widest"
                      >
                        ⚠️ {{ $t("payment.unavailable") }} {{ rate.disable_reason }}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="lg:w-[400px] space-y-6">
          <div
            class="sticky p-8 bg-white border border-gray-100 shadow-xl rounded-3xl top-28"
          >
            <h2
              class="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase border-b"
            >
              {{ $t("payment.order_summary") }}
            </h2>

            <div
              class="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar"
            >
              <div v-for="item in checkoutItems" :key="item.id" class="flex gap-4">
                <img
                  :src="item.product.image"
                  class="object-cover w-16 h-16 bg-gray-100 rounded-xl shrink-0"
                />
                <div class="flex-grow">
                  <p
                    class="font-bold text-gray-900 text-[11px] uppercase truncate w-32"
                    :title="item.product.name"
                  >
                    {{ item.product.name }}
                  </p>
                  <p
                    v-if="item.color"
                    class="text-gray-500 text-[9px] uppercase tracking-widest mt-0.5"
                  >
                    {{ $t("payment.color") }}
                    <span class="font-bold text-gray-700">{{
                      parseColorName(item.color)
                    }}</span>
                  </p>
                  <p class="text-gray-400 text-[10px]">Qty: {{ item.quantity }}</p>
                  <p class="mt-1 text-xs font-medium text-gray-900">
                    {{ formatPrice(getActivePrice(item.product) * item.quantity) }}
                  </p>
                </div>
              </div>
            </div>

            <div class="pt-4 space-y-3 text-sm border-t border-gray-50">
              <div class="flex justify-between text-gray-500">
                <span>{{ $t("payment.total_items") }}</span>
                <span class="font-bold text-gray-900"
                  >{{ checkoutCount }} {{ $t("payment.item") }}</span
                >
              </div>
              <div class="flex justify-between text-gray-500">
                <span>{{ $t("payment.subtotal") }}</span>
                <span>{{ formatPrice(checkoutTotalAmount) }}</span>
              </div>

              <div
                v-if="userData?.is_membership"
                class="pt-4 mt-2 border-t border-gray-200 border-dashed"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p
                      class="text-[10px] font-bold text-gray-900 uppercase tracking-widest flex items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-4 h-4 text-yellow-500"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      {{ $t("payment.vip_perks") }}
                    </p>
                    <p class="text-[10px] text-gray-500 mt-0.5">
                      {{ $t("payment.use_500k") }}
                    </p>
                    <p
                      v-if="checkoutTotalAmount < MEMBER_MIN_SPEND"
                      class="text-[8px] text-red-500 italic mt-0.5"
                    >
                      {{ $t("payment.min_spend") }}
                    </p>
                  </div>

                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="useMemberVoucher"
                      @change="handleMemberToggle"
                      class="sr-only peer"
                      :disabled="
                        isVerifyingPromo ||
                        (checkoutTotalAmount < MEMBER_MIN_SPEND && !useMemberVoucher)
                      "
                    />
                    <div
                      class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black disabled:opacity-50"
                    ></div>
                  </label>
                </div>
              </div>

              <div class="pt-4 mt-2 border-t border-gray-200 border-dashed">
                <label
                  class="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2 block"
                >
                  {{ $t("payment.promo_code") }}
                </label>
                <div class="flex gap-2">
                  <input
                    type="text"
                    v-model="promoInput"
                    :disabled="
                      appliedPromoCode !== null || isVerifyingPromo || useMemberVoucher
                    "
                    :placeholder="$t('payment.enter_promo_code')"
                    class="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm uppercase focus:ring-black outline-none disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
                  />
                  <button
                    v-if="!appliedPromoCode"
                    @click="applyPromo"
                    :disabled="!promoInput || isVerifyingPromo || useMemberVoucher"
                    class="bg-black text-white text-[10px] font-bold uppercase px-4 rounded-lg hover:bg-gray-800 transition disabled:bg-gray-300 w-20 flex justify-center items-center"
                  >
                    <span v-if="!isVerifyingPromo">{{ $t("payment.apply") }}</span>
                    <div
                      v-else
                      class="w-3 h-3 border-2 rounded-full border-white/40 border-t-white animate-spin"
                    ></div>
                  </button>
                  <button
                    v-else
                    @click="removePromo"
                    class="bg-red-50 text-red-600 border border-red-200 text-[10px] font-bold uppercase px-4 rounded-lg hover:bg-red-100 transition w-20"
                  >
                    {{ $t("payment.remove") }}
                  </button>
                </div>
                <p
                  v-if="promoMessage"
                  :class="promoSuccess ? 'text-green-600' : 'text-red-500'"
                  class="text-[10px] mt-2 font-medium"
                >
                  {{ promoMessage }}
                </p>
                <div
                  v-if="appliedPromoCode"
                  class="flex items-center justify-between mt-2"
                >
                  <span
                    class="text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                    >{{ $t("payment.promo_applied") }}</span
                  >
                  <span class="text-[11px] text-green-600 font-medium"
                    >- {{ formatPrice(promoDiscountAmount) }}</span
                  >
                </div>
              </div>

              <div
                v-if="userData?.is_membership && userData?.point > 0"
                class="pt-4 mt-2 border-t border-gray-200 border-dashed"
              >
                <div class="flex items-center justify-between mb-2">
                  <span
                    class="text-[10px] font-bold text-yellow-800 uppercase tracking-widest flex items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-3 h-3 text-yellow-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    {{ $t("payment.redeem_points") }}
                  </span>
                  <span class="text-xs text-gray-500"
                    >{{ $t("payment.bal") }} {{ userData.point }} Pts</span
                  >
                </div>
                <div class="flex gap-2">
                  <input
                    type="number"
                    v-model="pointsToUse"
                    :max="maxUsablePoints"
                    min="0"
                    class="flex-1 bg-white border border-yellow-300 rounded-lg px-3 py-1.5 text-sm focus:ring-yellow-500 outline-none"
                    placeholder="0"
                  />
                  <button
                    @click="useAllPoints"
                    class="bg-yellow-100 text-yellow-800 text-[10px] font-bold uppercase px-3 rounded-lg hover:bg-yellow-200 transition"
                  >
                    {{ $t("payment.use_all") }}
                  </button>
                </div>
                <p
                  v-if="pointsToUse > 0"
                  class="text-[10px] text-green-600 mt-1 font-medium text-right"
                >
                  - {{ formatPrice(pointDiscountAmount) }}
                </p>
              </div>

              <div class="flex items-start justify-between text-gray-500">
                <span>{{ $t("payment.shipping") }}</span>
                <span v-if="shippingMethod === 'free'" class="font-bold text-green-600">{{
                  $t("payment.free")
                }}</span>
                <div
                  v-else-if="shippingMethod === 'biteship' && selectedRate"
                  class="text-right"
                >
                  <span class="block font-medium text-gray-900">{{
                    formatPrice(selectedRate.price * checkoutCount)
                  }}</span>
                  <p class="text-[10px] text-gray-400 mt-1">
                    {{ formatPrice(selectedRate.price) }} x {{ checkoutCount }}
                    {{ $t("payment.item") }}
                  </p>
                </div>
                <span v-else class="italic text-[10px]">{{
                  $t("payment.select_method")
                }}</span>
              </div>

              <div
                class="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-100"
              >
                <span class="mt-1 text-xs tracking-widest uppercase">{{
                  $t("payment.grand_total")
                }}</span>
                <span class="text-xl">{{ formatPrice(grandTotalWithDiscount) }}</span>
              </div>

              <div
                v-if="userData?.is_membership"
                class="flex items-center gap-3 p-3 mt-4 border border-yellow-100 bg-yellow-50 rounded-xl"
              >
                <div
                  class="flex items-center justify-center w-8 h-8 text-white bg-yellow-400 rounded-full shrink-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    class="text-[10px] font-bold text-yellow-800 uppercase tracking-widest"
                  >
                    {{ $t("payment.points_to_earn") }}
                  </p>
                  <p class="text-sm font-black text-yellow-600">
                    +{{ calculateEarnedPoints }} Pts
                  </p>
                </div>
              </div>

              <button
                @click="handlePayment"
                :disabled="isButtonDisabled"
                class="mt-8 w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 py-5 rounded-2xl font-bold text-white text-xs uppercase tracking-[0.3em] transition-all duration-500 shadow-xl shadow-black/10"
              >
                <span v-if="!isProcessing">{{ $t("payment.pay_now") }}</span>
                <span v-else class="flex items-center justify-center gap-2">
                  <div
                    class="w-3 h-3 border-2 rounded-full border-white/30 border-t-white animate-spin"
                  ></div>
                  {{ $t("payment.processing") }}
                </span>
              </button>

              <p
                v-if="!selectedAddressId"
                class="mt-4 text-[10px] text-red-500 text-center uppercase tracking-tighter"
              >
                {{ $t("payment.select_shipping_address") }}
              </p>
              <p
                v-else-if="shippingMethod === 'biteship' && !selectedRate"
                class="mt-4 text-[10px] text-red-500 text-center uppercase tracking-tighter"
              >
                {{ $t("payment.select_courier_service") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm sm:p-6"
    >
      <div
        class="relative w-full max-w-2xl bg-white shadow-2xl rounded-3xl animate-fade-in flex flex-col max-h-[90vh] md:max-h-[85vh]"
      >
        <div
          class="flex items-center justify-between p-6 border-b border-gray-100 shrink-0 md:p-8 md:pb-6"
        >
          <h3 class="text-xl font-bold text-gray-900">
            {{ isEdit ? "Edit Address" : "Add New Address" }}
          </h3>
          <button
            @click="showModal = false"
            class="p-2 text-gray-400 transition-colors rounded-full hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
          >
            ✕
          </button>
        </div>

        <div class="p-6 overflow-y-auto custom-scrollbar md:p-8 grow">
          <form @submit.prevent="saveAddress" class="space-y-5">
            <div
              class="flex items-center gap-3 p-3.5 border border-blue-100 bg-blue-50 rounded-xl"
            >
              <input
                type="checkbox"
                v-model="form.is_default"
                id="def"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded cursor-pointer focus:ring-blue-500"
              />
              <label
                for="def"
                class="text-sm font-medium text-blue-900 cursor-pointer select-none"
                >{{ $t("payment.default_shipping_address") }}</label
              >
            </div>

            <div class="mb-4">
              <label
                class="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase"
              >
                Country / Region
              </label>
              <select
                v-model="form.region"
                @change="fetchProvinces"
                class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              >
                <option v-for="c in countries" :key="c.isoCode" :value="c.name">
                  {{ c.name }}
                </option>
              </select>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  class="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase"
                  >{{ $t("payment.first_name") }}</label
                >
                <input
                  v-model="form.first_name_address"
                  class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  class="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase"
                  >{{ $t("payment.last_name") }}</label
                >
                <input
                  v-model="form.last_name_address"
                  class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  class="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase"
                  >{{ $t("payment.province") }}</label
                >
                <select
                  v-if="filteredProvinces.length > 0"
                  v-model="form.province"
                  class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>{{ $t("payment.select_province") }}</option>
                  <option v-for="p in filteredProvinces" :key="p" :value="p">
                    {{ p }}
                  </option>
                </select>
                <input
                  v-else
                  v-model="form.province"
                  placeholder="State/Province"
                  class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  class="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase"
                  >{{ $t("payment.city") }}</label
                >
                <input
                  v-model="form.city"
                  class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div class="relative mt-4 overflow-hidden border border-gray-200 rounded-2xl">
              <div
                class="flex items-start gap-2 px-4 py-3 border-b bg-amber-50 border-amber-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="shrink-0 w-4 h-4 mt-0.5 text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p class="text-[11px] text-amber-800 leading-relaxed">
                  <span class="font-bold">{{ $t("payment.pin_location") }}</span>
                  {{ $t("payment.pin_location_desc") }}
                </p>
              </div>

              <div
                class="flex flex-col items-center justify-between gap-2 p-3 border-b border-gray-200 sm:flex-row bg-gray-50"
              >
                <div class="relative w-full sm:flex-1">
                  <input
                    type="text"
                    v-model="searchQuery"
                    @input="handleSearchInput"
                    placeholder="Search area (e.g. Tunjungan Plaza)"
                    class="w-full px-3 py-2.5 text-xs transition-colors border border-gray-300 outline-none rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div
                    v-if="searchResults.length > 0"
                    class="absolute z-[999] mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-40 overflow-y-auto custom-scrollbar"
                  >
                    <div
                      v-for="(result, idx) in searchResults"
                      :key="idx"
                      @click="selectSearchResult(result)"
                      class="px-3 py-2.5 text-xs text-gray-700 border-b cursor-pointer hover:bg-blue-50 last:border-0"
                    >
                      {{ result.display_name }}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  @click="getCurrentLocation"
                  class="w-full sm:w-auto px-4 py-2.5 text-[10px] font-bold tracking-wider text-blue-700 uppercase transition-colors bg-blue-100 rounded-xl hover:bg-blue-200"
                >
                  {{ $t("payment.current_loc") }}
                </button>
              </div>

              <div class="relative z-0 w-full h-40 sm:h-56">
                <l-map
                  ref="map"
                  v-model:zoom="zoom"
                  :center="center"
                  :use-global-leaflet="false"
                  @click="onMapClick"
                >
                  <l-tile-layer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    layer-type="base"
                    name="OpenStreetMap"
                  ></l-tile-layer>
                  <l-marker
                    :lat-lng="markerLatLng"
                    draggable
                    @update:latLng="onMarkerDrag"
                  ></l-marker>
                </l-map>
                <div
                  class="absolute z-[400] px-2 py-1 font-mono text-[9px] text-gray-600 bg-white/90 rounded shadow bottom-2 right-2 backdrop-blur pointer-events-none border border-gray-200"
                >
                  {{ form.latitude ? parseFloat(form.latitude).toFixed(5) : "-" }},
                  {{ form.longitude ? parseFloat(form.longitude).toFixed(5) : "-" }}
                </div>
              </div>
            </div>

            <div>
              <label
                class="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase"
                >Complete Address</label
              >
              <textarea
                v-model="form.address_location"
                rows="3"
                required
                class="w-full px-4 py-3 text-sm border border-gray-200 bg-gray-50 rounded-xl"
              ></textarea>
            </div>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                v-model="form.postal_code"
                placeholder="Postal Code"
                required
                class="w-full px-4 py-3 text-sm border border-gray-200 bg-gray-50 rounded-xl"
              />
            </div>
          </form>
        </div>

        <div
          class="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50/50"
        >
          <button
            @click="showModal = false"
            class="px-5 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-300 rounded-xl"
          >
            Cancel
          </button>
          <button
            @click="saveAddress"
            class="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl"
          >
            Save Address
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, nextTick } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
// import { useCart } from "../../composables/useCart.js";
import { useCart, getActivePrice } from "../../composables/useCart.js";
import { Country, State } from "country-state-city";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";
import { formatPrice } from "../../utils/currency";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

const router = useRouter();
const getAxiosConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const {
  cartItems,
  checkoutCount,
  checkoutTotalAmount,
  selectedItemIds,
  clearSelectedCart,
} = useCart();

const userData = ref(null);
const addresses = ref([]);
const selectedAddressId = ref(null);
const isProcessing = ref(false);
const shippingMethod = ref("free");
const selectedRate = ref(null);
const isLoadingRates = ref(false);
const deliveryType = ref("now");
const deliveryDate = ref("");
const deliveryTime = ref("");
const pointsToUse = ref(0);
const pointConversionRate = 1000;
const promoInput = ref("");
const appliedPromoCode = ref(null);
const promoDiscountAmount = ref(0);
const promoMessage = ref("");
const promoSuccess = ref(false);
const isVerifyingPromo = ref(false);
const rawShippingRates = ref([]);
const isPageLoading = ref(true);

const useMemberVoucher = ref(false);
const MEMBER_VOUCHER_CODE = "SOLHERMEMBER";
const MEMBER_MIN_SPEND = 1000000;

// ==========================================
// KUMPULAN HELPER FUNCTION YANG HILANG
// ==========================================

// 1. Pemecah string warna (misal: "Black|#000000" menjadi "Black")
const parseColorName = (colorString) => {
  if (!colorString) return "";
  return colorString.includes("|") ? colorString.split("|")[0] : colorString;
};

// 2. State untuk menangani gambar kurir yang gagal dimuat (fallback ke text)
const imageErrors = ref({});
const handleImageError = (company) => {
  imageErrors.value[company] = true;
};

// [PERBAIKAN 1]: Mengambil nama negara ('region') ke dalam Computed Property
// const destinationInfo = computed(() => {
//   if (!selectedAddressId.value || !addresses.value) return null;
//   const addr = addresses.value.find((a) => a.id === selectedAddressId.value);
//   if (!addr) return null;
//   return {
//     name: addr.receiver.full_name,
//     phone: userData.value?.phone || "No Phone Provided",
//     address: `${addr.details.location}, ${addr.details.city}, ${addr.details.province}`,
//     postal_code: addr.details.postal_code,
//     country: addr.details.region, // Ini menangkap nilai dropdown Country
//   };
// });

const destinationInfo = computed(() => {
  if (!selectedAddressId.value || !addresses.value) return null;
  const addr = addresses.value.find((a) => a.id === selectedAddressId.value);
  if (!addr) return null;

  return {
    name: addr.receiver?.full_name || "Unknown",
    phone: userData.value?.phone || "No Phone Provided",
    address: `${addr.details?.location || ""}, ${addr.details?.city || ""}, ${
      addr.details?.province || ""
    }`,
    postal_code: addr.postal_code || addr.details?.postal_code || "",

    // [PERBAIKAN]: Pengecekan ganda. Cari di root, jika tidak ada cari di details.
    // Jika tidak ada keduanya, set default ke Indonesia.
    country: addr.region || addr.details?.region || "Indonesia",
  };
});

// [PERBAIKAN 2]: Menambahkan logo DHL ke fungsi fallback image
const getCourierLogo = (company) => {
  const baseUrl = "/courier_images/";
  const map = {
    jne: "jne.png",
    sicepat: "sicepat.png",
    jnt: "jnt.png",
    anteraja: "anteraja.png",
    gojek: "gojek.png",
    grab: "grab.png",
    paxel: "paxel.png",
    ninja: "ninja.png",
    dhl: "dhl.png", // LOGO DHL
  };
  return map[company.toLowerCase()] ? baseUrl + map[company.toLowerCase()] : null;
};

// Data & Logika Modal Form Alamat
const showModal = ref(false);
const countries = ref(Country.getAllCountries());
const filteredProvinces = ref([]);
const form = ref({
  id: null,
  region: "Indonesia", // Default ke Indonesia
  first_name_address: "",
  last_name_address: "",
  address_location: "",
  location_type: "",
  city: "",
  province: "",
  postal_code: "",
  latitude: null,
  longitude: null,
  is_default: true,
});

// [PERBAIKAN 3]: Fungsi cerdas untuk meload data provinsi bedasarkan negara
const fetchProvinces = () => {
  const selectedCountry = countries.value.find((c) => c.name === form.value.region);
  if (selectedCountry) {
    const states = State.getStatesOfCountry(selectedCountry.isoCode);
    filteredProvinces.value = states.map((s) => s.name);
  } else {
    filteredProvinces.value = [];
  }
};

const openModal = () => {
  form.value = {
    region: "Indonesia",
    is_default: true,
    first_name_address: userData.value?.first_name || "",
    last_name_address: userData.value?.last_name || "",
    address_location: "",
    location_type: "",
    city: "",
    province: "",
    postal_code: "",
    latitude: null,
    longitude: null,
  };
  fetchProvinces(); // Load provinsi saat modal dibuka
  showModal.value = true;
};

const handleSearchInput = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  if (searchQuery.value.length < 3) {
    searchResults.value = [];
    return;
  }
  debounceTimeout = setTimeout(async () => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery.value}&countrycodes=id&limit=5`
      );
      searchResults.value = res.data;
    } catch (error) {}
  }, 500);
};

const maxUsablePoints = computed(() => {
  if (!userData.value || checkoutTotalAmount.value === 0) return 0;
  const userBalance = userData.value.point || 0;
  const priceAfterPromo = checkoutTotalAmount.value - promoDiscountAmount.value;
  const maxPointsForPrice = Math.floor(
    Math.max(0, priceAfterPromo) / pointConversionRate
  );
  return Math.min(userBalance, maxPointsForPrice);
});

const selectSearchResult = (result) => {
  const lat = parseFloat(result.lat);
  const lng = parseFloat(result.lon);
  if (map.value && map.value.leafletObject) map.value.leafletObject.flyTo([lat, lng], 16);
  else {
    center.value = [lat, lng];
    zoom.value = 16;
  }
  markerLatLng.value = [lat, lng];
  form.value.latitude = lat.toString();
  form.value.longitude = lng.toString();
  form.value.address_location = result.display_name;
  searchResults.value = [];
  searchQuery.value = "";
};

const onMapClick = (event) => {
  const { lat, lng } = event.latlng;
  updateLocation(lat, lng);
};
const onMarkerDrag = (event) => {
  const { lat, lng } = event.target.getLatLng();
  updateLocation(lat, lng);
};
const updateLocation = (lat, lng) => {
  markerLatLng.value = [lat, lng];
  form.value.latitude = lat.toString();
  form.value.longitude = lng.toString();
  reverseGeocode(lat, lng);
};

const reverseGeocode = async (lat, lng) => {
  try {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    if (res.data && res.data.display_name) {
      form.value.address_location = res.data.display_name;
      if (res.data.address && res.data.address.postcode)
        form.value.postal_code = res.data.address.postcode;
    }
  } catch (error) {
    console.error("Reverse Geocode Error", error);
  }
};

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        if (map.value && map.value.leafletObject)
          map.value.leafletObject.flyTo([lat, lng], 16);
        else {
          center.value = [lat, lng];
          zoom.value = 16;
        }
        updateLocation(lat, lng);
      },
      () => Swal.fire("Error", "Please allow location access.", "error")
    );
  }
};

const map = ref(null);
const zoom = ref(13);
const center = ref([-7.250445, 112.768845]);
const markerLatLng = ref([-7.250445, 112.768845]);
const searchQuery = ref("");
const searchResults = ref([]);
let debounceTimeout = null;

const saveAddress = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/addresses`, form.value, getAxiosConfig());
    showModal.value = false;
    const resAddr = await axios.get(`${BASE_URL}/addresses`, getAxiosConfig());
    addresses.value = resAddr.data.data;
    selectedAddressId.value =
      res.data.id || res.data.data?.id || addresses.value[addresses.value.length - 1].id;
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Address Added!",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (e) {
    Swal.fire("Error", "Failed to save address", "error");
  }
};

// [PERBAIKAN 4]: Menangkap `res.data.rates` dari Backend baru
// watch(selectedAddressId, async (newVal) => {
//   if (newVal) {
//     if (!selectedItemIds.value || selectedItemIds.value.length === 0) return;
//     selectedRate.value = null;
//     isLoadingRates.value = true;
//     rawShippingRates.value = [];
//     try {
//       const res = await axios.post(
//         `${BASE_URL}/shipping/rates`,
//         { address_id: newVal, cart_ids: selectedItemIds.value },
//         getAxiosConfig()
//       );

//       // Deteksi struktur response baru dari Factory (Gateway)
//       if (res.data && res.data.rates) {
//         rawShippingRates.value = res.data.rates;
//       } else if (res.data && res.data.pricing) {
//         rawShippingRates.value = res.data.pricing; // Fallback Biteship lama
//       }
//     } catch (error) {
//       if (error.response?.status === 401) return router.push("/login");
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "error",
//         title: "Failed to calculate shipping.",
//         showConfirmButton: false,
//         timer: 4000,
//       });
//     } finally {
//       isLoadingRates.value = false;
//     }
//   }
// });

const isButtonDisabled = computed(() => {
  if (isProcessing.value || cartItems.value.length === 0 || !selectedAddressId.value)
    return true;
  if (shippingMethod.value === "biteship") {
    if (!selectedRate.value) return true;
    if (
      deliveryType.value === "scheduled" &&
      (!deliveryDate.value || !deliveryTime.value)
    )
      return true;
  }
  return false;
});

watch(selectedAddressId, async (newVal) => {
  if (newVal) {
    if (!selectedItemIds.value || selectedItemIds.value.length === 0) return;
    selectedRate.value = null;
    isLoadingRates.value = true;
    rawShippingRates.value = [];
    try {
      const res = await axios.post(
        `${BASE_URL}/shipping/rates`,
        { address_id: newVal, cart_ids: selectedItemIds.value },
        getAxiosConfig()
      );

      // [PERBAIKAN]: Menambahkan penangkap res.data.data untuk Shippo/Mock
      if (res.data && res.data.data) {
        rawShippingRates.value = res.data.data;
      } else if (res.data && res.data.rates) {
        rawShippingRates.value = res.data.rates;
      } else if (res.data && res.data.pricing) {
        rawShippingRates.value = res.data.pricing; // Fallback Biteship lama
      }
    } catch (error) {
      if (error.response?.status === 401) return router.push("/login");
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to calculate shipping.",
        showConfirmButton: false,
        timer: 4000,
      });
    } finally {
      isLoadingRates.value = false;
    }
  }
});

const pointDiscountAmount = computed(
  () => (pointsToUse.value || 0) * pointConversionRate
);

const totalQuantityToCheckout = computed(() =>
  checkoutItems.value.reduce((sum, item) => sum + item.quantity, 0)
);

// const processedShippingRates = computed(() => {
//   if (!rawShippingRates.value || rawShippingRates.value.length === 0) return [];
//   // ... (Sisa logika jarak Gojek/Grab tetap sama persis, tidak perlu diubah karena DHL akan terlewat dari validasi ini dengan status is_disabled: false) ...
//   return rawShippingRates.value.map((rate) => ({
//     ...rate,
//     is_disabled: false,
//     disable_reason: "",
//   }));
// });

const processedShippingRates = computed(() => {
  if (!rawShippingRates.value || rawShippingRates.value.length === 0) return [];

  return rawShippingRates.value.map((rate) => {
    // Deteksi apakah ini format Shippo/Mock atau format Biteship
    const isShippo = rate.provider !== undefined;

    return {
      ...rate,
      // [PERBAIKAN TRANSLATOR]: Jika dari Shippo, ubah 'provider' jadi 'company' agar UI tidak error
      company: isShippo ? rate.provider : rate.company,
      type: isShippo ? rate.service_name : rate.type,
      duration: isShippo ? rate.etd : rate.duration,
      courier_name: isShippo ? "Global Express" : rate.courier_name,
      price: rate.price,

      is_disabled: false,
      disable_reason: "",
    };
  });
});

const handlePayment = async () => {
  isProcessing.value = true;
  try {
    const activeCurrency = localStorage.getItem("currency") || "IDR";
    const payload = {
      address_id: selectedAddressId.value,
      shipping_method: shippingMethod.value,
      use_points: pointsToUse.value,
      cart_ids: selectedItemIds.value,
      courier_company:
        shippingMethod.value === "biteship" ? selectedRate.value?.company : null,
      courier_type: shippingMethod.value === "biteship" ? selectedRate.value?.type : null,
      shipping_cost:
        shippingMethod.value === "biteship" ? selectedRate.value?.price : null,
      delivery_type: shippingMethod.value === "biteship" ? deliveryType.value : null,
      delivery_date: shippingMethod.value === "biteship" ? deliveryDate.value : null,
      delivery_time: shippingMethod.value === "biteship" ? deliveryTime.value : null,
      promo_code: appliedPromoCode.value,
      currency: activeCurrency,
      referral_code: localStorage.getItem("affiliate_ref"),
    };
    const res = await axios.post(`${BASE_URL}/checkout`, payload, getAxiosConfig());
    if (res.data.checkout_url) {
      clearSelectedCart();
      window.location.href = res.data.checkout_url;
    }
  } catch (error) {
    Swal.fire(
      "Payment Error",
      error.response?.data?.message || "Failed to create invoice",
      "error"
    );
  } finally {
    isProcessing.value = false;
  }
};

const fetchData = async () => {
  try {
    const user = localStorage.getItem("user");
    if (user) userData.value = JSON.parse(user);
    const resAddr = await axios.get(`${BASE_URL}/addresses`, getAxiosConfig());
    addresses.value = resAddr.data.data;
    if (addresses.value.length > 0) {
      const defaultAddr = addresses.value.find((a) => a.is_default);
      selectedAddressId.value = defaultAddr ? defaultAddr.id : addresses.value[0].id;
    }
    isPageLoading.value = false;
  } catch (error) {
    isPageLoading.value = false;
  }
};

const calculateEarnedPoints = computed(() =>
  Math.floor(checkoutTotalAmount.value / 100000)
);

const checkoutItems = computed(() =>
  cartItems.value.filter((item) => selectedItemIds.value.includes(item.id))
);
const grandTotal = computed(() => {
  let total = checkoutTotalAmount.value;
  if (shippingMethod.value === "biteship" && selectedRate.value)
    total += parseFloat(selectedRate.value.price) * checkoutCount.value;
  return total;
});
const grandTotalWithDiscount = computed(
  () => grandTotal.value - promoDiscountAmount.value - pointDiscountAmount.value
);

const handleMemberToggle = async () => {
  if (useMemberVoucher.value) {
    if (checkoutTotalAmount.value < MEMBER_MIN_SPEND) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "warning",
        title: `Min. spend is Rp ${MEMBER_MIN_SPEND.toLocaleString("id-ID")}`,
        showConfirmButton: false,
        timer: 3000,
      });
      useMemberVoucher.value = false;
      return;
    }
    promoInput.value = MEMBER_VOUCHER_CODE;
    await applyPromo();
    if (!promoSuccess.value) useMemberVoucher.value = false;
  } else {
    if (appliedPromoCode.value === MEMBER_VOUCHER_CODE) removePromo();
  }
};

const applyPromo = async () => {
  if (!promoInput.value) return;
  isVerifyingPromo.value = true;
  try {
    const codeToBeApplied = promoInput.value.toUpperCase();
    const res = await axios.post(
      `${BASE_URL}/promo/verify`,
      {
        promo_code: codeToBeApplied,
        cart_items: checkoutItems.value.map((item) => ({ product_id: item.product_id })),
      },
      getAxiosConfig()
    );
    if (
      codeToBeApplied === MEMBER_VOUCHER_CODE &&
      checkoutTotalAmount.value < MEMBER_MIN_SPEND
    )
      throw new Error(`Minimum spend is Rp ${MEMBER_MIN_SPEND.toLocaleString("id-ID")}`);
    else if (
      codeToBeApplied !== MEMBER_VOUCHER_CODE &&
      checkoutTotalAmount.value < 499000
    )
      throw new Error("Minimum spend is Rp 499.000");
    promoSuccess.value = true;
    promoMessage.value = "✅ " + res.data.message;
    appliedPromoCode.value = codeToBeApplied;
    promoDiscountAmount.value = Math.min(
      res.data.discount_value,
      checkoutTotalAmount.value
    );
    if (appliedPromoCode.value === MEMBER_VOUCHER_CODE) useMemberVoucher.value = true;
    if (pointsToUse.value > maxUsablePoints.value)
      pointsToUse.value = maxUsablePoints.value;
  } catch (error) {
    promoSuccess.value = false;
    promoMessage.value =
      "❌ " + (error.response?.data?.message || error.message || "Invalid promo code.");
    appliedPromoCode.value = null;
    promoDiscountAmount.value = 0;
    useMemberVoucher.value = false;
  } finally {
    isVerifyingPromo.value = false;
  }
};

const removePromo = () => {
  promoInput.value = "";
  appliedPromoCode.value = null;
  promoDiscountAmount.value = 0;
  promoMessage.value = "";
  promoSuccess.value = false;
  useMemberVoucher.value = false;
};
const useAllPoints = () => {
  pointsToUse.value = maxUsablePoints.value;
};

onMounted(fetchData);
</script>

<style scoped>
/* CSS Keyframes untuk Animasi Bouncing Dots */
.animate-bounce-1 {
  animation: bounceDots 1.4s infinite ease-in-out both;
  animation-delay: -0.32s;
}
.animate-bounce-2 {
  animation: bounceDots 1.4s infinite ease-in-out both;
  animation-delay: -0.16s;
}
.animate-bounce-3 {
  animation: bounceDots 1.4s infinite ease-in-out both;
}

@keyframes bounceDots {
  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style> -->
<!-- <template>
  <div
    v-if="isPageLoading"
    class="z-[100] fixed inset-0 flex flex-col justify-center items-center bg-white"
  >
    <div class="flex gap-2 mb-4">
      <div class="w-3 h-3 bg-black rounded-full animate-bounce-1"></div>
      <div class="w-3 h-3 bg-black rounded-full animate-bounce-2"></div>
      <div class="w-3 h-3 bg-black rounded-full animate-bounce-3"></div>
    </div>
    <p class="font-serif text-sm italic tracking-widest text-gray-500 animate-pulse">
      {{ $t("payment.prepare_checkout") }}
    </p>
  </div>

  <div v-else class="max-w-6xl min-h-screen px-6 py-12 mx-auto md:py-24 animate-fade-in">
    <div v-if="checkoutItems.length === 0" class="py-20 text-center">
      <h2 class="mb-4 font-serif text-3xl">{{ $t("payment.bag_empty") }}</h2>
      <button
        @click="$router.push('/collections')"
        class="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase bg-black rounded-full"
      >
        {{ $t("payment.return_shop") }}
      </button>
    </div>

    <div v-else>
      <h1 class="mb-12 font-serif text-3xl tracking-tighter uppercase md:text-4xl">
        {{ $t("payment.checkout") }}
      </h1>

      <div class="flex flex-col gap-12 lg:flex-row">
        <div class="flex-grow space-y-12">
          <section>
            <div class="flex items-center gap-4 mb-4">
              <span
                class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
                >1</span
              >
              <h2 class="text-sm font-bold tracking-widest text-gray-900 uppercase">
                {{ $t("payment.shipping_address") }}
              </h2>
            </div>

            <div
              v-if="addresses.length === 0"
              class="py-10 text-center border border-gray-300 border-dashed bg-gray-50 rounded-2xl"
            >
              <p class="mb-2 text-sm italic text-gray-500">
                {{ $t("payment.no_address_found") }}
              </p>
              <button
                @click="openModal()"
                class="text-xs font-bold text-blue-600 underline"
              >
                {{ $t("payment.add_new_address") }}
              </button>
            </div>
            <div v-else class="space-y-4">
              <label
                v-for="addr in addresses"
                :key="addr.id"
                :class="[
                  selectedAddressId === addr.id
                    ? 'border-black ring-1 ring-black bg-white shadow-md'
                    : 'border-gray-100 bg-gray-50/50',
                ]"
                class="relative flex items-start p-6 transition-all border cursor-pointer rounded-2xl hover:bg-white"
              >
                <input
                  type="radio"
                  name="address"
                  :value="addr.id"
                  v-model="selectedAddressId"
                  class="w-4 h-4 mt-1 text-black border-gray-300 focus:ring-black"
                />
                <div class="flex-grow ml-4">
                  <div class="flex justify-between">
                    <p class="text-sm font-bold text-gray-900 uppercase">
                      {{ addr.receiver.full_name }}
                    </p>
                    <span
                      v-if="addr.is_default"
                      class="text-[9px] bg-gray-200 px-2 py-0.5 rounded font-bold uppercase"
                      >{{ $t("payment.default") }}</span
                    >
                  </div>
                  <p class="mt-2 text-sm leading-relaxed text-gray-600">
                    {{ addr.details.location }}, {{ addr.details.type }} <br />
                    {{ addr.details.city }}, {{ addr.details.province }} <br />
                    {{ addr.details.region }} - {{ addr.details.postal_code }}
                  </p>
                </div>
              </label>
              <button
                @click="openModal()"
                class="mt-4 text-xs font-bold text-gray-500 underline hover:text-black"
              >
                {{ $t("payment.add_another_address") }}
              </button>
            </div>
          </section>

          <section v-if="!selectedAddressId">
            <div class="flex items-center gap-4 mb-4">
              <span
                class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
                >2</span
              >
              <h2 class="text-sm font-bold tracking-widest text-gray-900 uppercase">
                {{ $t("payment.shipping_method") }}
              </h2>
            </div>

            <div>
              <h4 class="text-sm tracking-widest text-gray-900 uppercase">
                {{ $t("payment.choose_shipping_address") }}
              </h4>
            </div>
          </section>

          <section v-if="selectedAddressId">
            <div class="flex items-center gap-4 mb-4">
              <span
                class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
                >2</span
              >
              <h2 class="text-sm font-bold tracking-widest text-gray-900 uppercase">
                {{ $t("payment.shipping_method") }}
              </h2>
            </div>

            <div class="space-y-4">
              <label
                v-if="destinationInfo?.country === 'Indonesia'"
                :class="[
                  shippingMethod === 'free'
                    ? 'border-black ring-1 ring-black bg-white shadow-md'
                    : 'border-gray-100 bg-gray-50/50',
                ]"
                class="relative flex items-center p-6 transition-all border cursor-pointer rounded-2xl"
              >
                <input
                  type="radio"
                  value="free"
                  v-model="shippingMethod"
                  class="w-4 h-4 text-black border-gray-300 focus:ring-black"
                />
                <div class="flex items-center justify-between flex-grow ml-4">
                  <div>
                    <p class="text-sm font-bold tracking-wide text-gray-900 uppercase">
                      {{ $t("payment.free_shipping") }}
                    </p>
                    <p class="mt-1 text-xs font-bold text-green-600">
                      {{ $t("payment.in_store") }}
                    </p>
                  </div>
                  <p class="font-black text-black">{{ $t("payment.price") }}</p>
                </div>
              </label>

              <label
                :class="[
                  shippingMethod === 'biteship'
                    ? 'border-black ring-1 ring-black bg-white shadow-md'
                    : 'border-gray-100 bg-gray-50/50',
                ]"
                class="relative flex items-center p-6 transition-all border cursor-pointer rounded-2xl"
              >
                <input
                  type="radio"
                  value="biteship"
                  v-model="shippingMethod"
                  class="w-4 h-4 text-black border-gray-300 focus:ring-black"
                />
                <div class="flex items-center justify-between flex-grow ml-4">
                  <div>
                    <p class="text-sm font-bold tracking-wide text-gray-900 uppercase">
                      {{ $t("payment.standard") }}
                    </p>
                    <p class="mt-1 text-xs text-gray-500">
                      {{
                        destinationInfo?.country === "Indonesia"
                          ? $t("payment.powered_by_biteship")
                          : "International Express Delivery"
                      }}
                    </p>
                  </div>
                </div>
              </label>

              <div
                v-if="shippingMethod === 'biteship'"
                class="p-6 mt-4 space-y-8 bg-white border border-gray-200 rounded-3xl animate-fade-in"
              >
                <div
                  class="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 bg-gray-50 rounded-2xl"
                >
                  <div>
                    <h3
                      class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3"
                    >
                      {{ $t("payment.destination") }}
                    </h3>
                    <p class="text-xs font-bold text-gray-900 uppercase">
                      {{ destinationInfo?.name }}
                    </p>
                    <p class="mt-1 text-xs text-gray-500">
                      {{ destinationInfo?.phone }}
                    </p>
                    <p class="mt-1 text-xs text-gray-500 line-clamp-2">
                      {{ destinationInfo?.address }} -
                      {{ destinationInfo?.postal_code }}
                    </p>
                    <p class="mt-1 text-xs font-bold text-blue-600 uppercase">
                      {{ destinationInfo?.country }}
                    </p>
                  </div>
                </div>

                <div v-if="destinationInfo?.country === 'Indonesia'">
                  <h3 class="mb-4 text-sm font-bold tracking-widest uppercase">
                    {{ $t("payment.pickup_schedule") }}
                  </h3>

                  <div class="flex flex-col gap-4 mb-4 md:flex-row">
                    <label
                      :class="
                        deliveryType === 'now'
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200'
                      "
                      class="flex-1 p-4 transition border cursor-pointer rounded-xl"
                    >
                      <input
                        type="radio"
                        value="now"
                        v-model="deliveryType"
                        class="hidden"
                      />
                      <p class="text-xs font-bold uppercase">
                        {{ $t("payment.standard_pickup") }}
                      </p>
                      <p class="text-[10px] text-gray-500 mt-1">
                        {{ $t("payment.scheduled_pickup") }}
                      </p>
                    </label>
                    <label
                      :class="
                        deliveryType === 'scheduled'
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200'
                      "
                      class="flex-1 p-4 transition border cursor-pointer rounded-xl"
                    >
                      <input
                        type="radio"
                        value="scheduled"
                        v-model="deliveryType"
                        class="hidden"
                      />
                      <p class="text-xs font-bold uppercase">
                        {{ $t("payment.scheduled_pickup") }}
                      </p>
                      <p class="text-[10px] text-gray-500 mt-1">
                        {{ $t("payment.choose_specific_date_time") }}
                      </p>
                    </label>
                  </div>

                  <div
                    v-if="deliveryType === 'scheduled'"
                    class="flex gap-4 p-4 border border-blue-100 bg-blue-50/30 rounded-xl animate-fade-in"
                  >
                    <div class="flex-1">
                      <label
                        class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2"
                        >{{ $t("payment.pickup_date") }}</label
                      >
                      <input
                        type="date"
                        v-model="deliveryDate"
                        :min="todayDate"
                        class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-black focus:border-black"
                        required
                      />
                    </div>
                    <div class="flex-1">
                      <label
                        class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2"
                        >{{ $t("payment.pickup_time") }}</label
                      >
                      <input
                        type="time"
                        v-model="deliveryTime"
                        class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-black focus:border-black"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3
                    class="pt-6 mb-4 text-sm font-bold tracking-widest uppercase border-t"
                  >
                    {{ $t("payment.select_courier") }}
                  </h3>
                  <div
                    v-if="isLoadingRates"
                    class="py-4 text-sm text-center text-gray-500 animate-pulse"
                  >
                    {{ $t("payment.calculating_couriers") }}
                  </div>
                  <div
                    v-else-if="processedShippingRates.length === 0"
                    class="py-4 text-xs italic text-center text-red-500"
                  >
                    {{ $t("payment.no_courier_available") }}
                  </div>
                  <div v-else class="space-y-3">
                    <label
                      v-for="(rate, idx) in processedShippingRates"
                      :key="idx"
                      :class="[
                        rate.is_disabled
                          ? 'opacity-40 bg-gray-100 border-gray-200 pointer-events-none select-none'
                          : selectedRate?.company === rate.company &&
                            selectedRate?.type === rate.type
                          ? 'border-black bg-gray-50 shadow-sm'
                          : 'border-gray-200 hover:bg-gray-50 cursor-pointer transition-all',
                      ]"
                      class="relative flex flex-col p-4 border rounded-xl"
                    >
                      <div class="flex items-center w-full">
                        <input
                          type="radio"
                          :value="rate"
                          v-model="selectedRate"
                          :disabled="rate.is_disabled"
                          class="w-4 h-4 text-black border-gray-300 focus:ring-black disabled:opacity-50"
                        />
                        <div class="flex items-center flex-grow gap-4 ml-4">
                          <div
                            class="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0"
                          >
                            <img
                              v-show="!imageErrors[rate.company]"
                              v-if="getCourierLogo(rate.company)"
                              :src="getCourierLogo(rate.company)"
                              :alt="rate.company"
                              class="object-contain w-full h-full p-1"
                              @error="handleImageError(rate.company)"
                            />
                            <span
                              v-show="
                                imageErrors[rate.company] || !getCourierLogo(rate.company)
                              "
                              class="text-xs font-black text-gray-300"
                            >
                              {{ rate.company.toUpperCase() }}
                            </span>
                          </div>
                          <div>
                            <p
                              class="text-sm font-bold tracking-wide text-gray-800 uppercase"
                            >
                              {{ rate.company }} - {{ rate.type.replace("_", " ") }}
                            </p>
                            <p class="text-gray-500 text-[10px] mt-0.5">
                              {{ rate.courier_name }} ({{ rate.duration }})
                            </p>
                          </div>
                        </div>
                        <p class="text-sm font-black text-gray-900">
                          {{
                            formatCurrencyDisplay(convertIDRtoActiveCurrency(rate.price))
                          }}
                        </p>
                      </div>

                      <div
                        v-if="rate.is_disabled"
                        class="mt-3 ml-8 text-[10px] text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 font-bold uppercase tracking-widest"
                      >
                        ⚠️ {{ $t("payment.unavailable") }} {{ rate.disable_reason }}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="lg:w-[400px] space-y-6">
          <div
            class="sticky p-8 bg-white border border-gray-100 shadow-xl rounded-3xl top-28"
          >
            <h2
              class="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200"
            >
              {{ $t("payment.order_summary") }}
            </h2>

            <div
              class="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar"
            >
              <div v-for="item in checkoutItems" :key="item.id" class="flex gap-4">
                <img
                  :src="item.product.image_url"
                  class="object-cover w-16 h-16 bg-gray-100 border border-gray-100 rounded-xl shrink-0"
                />
                <div class="flex-grow">
                  <div class="flex items-center gap-2">
                    <p
                      class="w-40 text-[11px] font-bold text-gray-900 uppercase truncate"
                      :title="item.product.name"
                    >
                      {{ item.product.name }}
                    </p>
                    <span
                      v-if="
                        userType === 'reseller' &&
                        item.product.wholesale_price > 0 &&
                        checkoutCount >= 24
                      "
                      class="px-1.5 py-0.5 text-[8px] font-bold text-white bg-blue-600 rounded"
                      >GROSIR</span
                    >
                  </div>
                  <div class="flex items-center gap-2 mt-0.5">
                    <p class="text-[10px] text-gray-400">Qty: {{ item.quantity }}</p>
                    <template v-if="item.color">
                      <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <div class="flex items-center gap-1.5">
                        <div
                          class="w-3 h-3 border border-gray-300 rounded-full shadow-sm shrink-0"
                          :style="{ backgroundColor: parseColorHex(item.color) }"
                        ></div>
                        <span class="text-[10px] font-bold text-gray-500 uppercase">
                          {{ parseColorName(item.color) }}
                        </span>
                      </div>
                    </template>
                  </div>

                  <p class="mt-1 text-xs font-medium text-gray-900">
                    {{
                      formatCurrencyDisplay({
                        value: getActivePriceObj(item.product).value * item.quantity,
                        curr: getActivePriceObj(item.product).curr,
                      })
                    }}
                    <span
                      v-if="
                        getActivePriceObj(item.product).value <
                        getPriceToDisplay(item.product).value
                      "
                      class="text-[9px] line-through text-gray-400 ml-1"
                    >
                      {{
                        formatCurrencyDisplay({
                          value: getPriceToDisplay(item.product).value * item.quantity,
                          curr: getPriceToDisplay(item.product).curr,
                        })
                      }}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div class="pt-4 space-y-3 text-sm border-t border-gray-50">
              <div class="flex justify-between text-gray-500">
                <span>{{ $t("payment.total_items") }}</span>
                <span class="font-bold text-gray-900"
                  >{{ checkoutCount }} {{ $t("payment.item") }}</span
                >
              </div>
              <div class="flex justify-between text-gray-500">
                <span>{{ $t("payment.subtotal") }}</span>
                <span
                  :class="
                    appliedPromoType === 'voucher' ? 'text-amber-600 font-bold' : ''
                  "
                >
                  {{ formatCurrencyDisplay(localSubtotalObj) }}
                </span>
              </div>

              <div class="pt-4 mt-2 border-t border-gray-200 border-dashed">
                <label
                  class="block mb-2 text-[10px] font-bold tracking-widest text-gray-900 uppercase"
                >
                  {{ $t("payment.promo_label") }}
                </label>
                <form @submit.prevent="applyPromo" class="flex gap-2">
                  <input
                    type="text"
                    v-model="promoInput"
                    :disabled="!!appliedPromoCode || isVerifyingPromo || useMemberVoucher"
                    :placeholder="$t('payment.enter_promo_code')"
                    class="flex-1 px-3 py-2 text-sm uppercase bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gray-900 disabled:bg-gray-100 transition-colors"
                  />
                  <button
                    v-if="!appliedPromoCode"
                    type="submit"
                    :disabled="!promoInput || isVerifyingPromo || useMemberVoucher"
                    class="bg-black text-white text-[10px] font-bold uppercase px-4 rounded-lg hover:bg-gray-800 transition disabled:bg-gray-300 w-20 flex justify-center items-center"
                  >
                    <span v-if="!isVerifyingPromo">{{ $t("payment.apply") }}</span>
                    <div
                      v-else
                      class="w-3 h-3 border-2 rounded-full border-white/40 border-t-white animate-spin"
                    ></div>
                  </button>
                  <button
                    v-else
                    type="button"
                    @click="removePromo"
                    class="bg-red-50 text-red-600 border border-red-200 text-[10px] font-bold uppercase px-4 rounded-lg hover:bg-red-100 transition w-20"
                  >
                    {{ $t("payment.remove") }}
                  </button>
                </form>
                <p
                  v-if="promoMessage"
                  :class="promoSuccess ? 'text-green-600' : 'text-red-500'"
                  class="text-[10px] mt-2 font-medium"
                >
                  {{ promoMessage }}
                </p>
                <div
                  v-if="appliedPromoCode"
                  class="flex items-center justify-between mt-2 text-[10px] md:text-xs font-medium text-emerald-600"
                >
                  <span class="pr-2 truncate">
                    Promo (
                    <span class="font-mono uppercase">
                      {{ appliedPromoCode }}
                    </span>
                    )
                  </span>
                  <span>- {{ formatCurrencyDisplay(actualPromoDiscountObj) }}</span>
                </div>
              </div>

              <div class="pt-4 mt-2 border-t border-gray-200 border-dashed">
                <div class="flex items-center justify-between mb-3">
                  <label
                    class="text-[10px] font-bold tracking-widest text-gray-900 uppercase"
                  >
                    {{ $t("payment.loyalty_points") }}
                  </label>
                  <span class="text-xs text-gray-500">
                    {{ $t("payment.balance") }}{" "}
                    <strong class="text-gray-900"> {{ availablePoints }} Pts </strong>
                  </span>
                </div>
                <form @submit.prevent="handleApplyPoints" class="flex gap-2">
                  <input
                    type="number"
                    v-model.number="pointsInput"
                    :disabled="pointsUsed > 0 || availablePoints <= 0"
                    :placeholder="'Maks: ' + maxPointsAllowed"
                    class="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-gray-900 disabled:bg-gray-100"
                    min="0"
                    :max="maxPointsAllowed"
                  />
                  <button
                    v-if="pointsUsed === 0"
                    type="submit"
                    :disabled="!pointsInput || availablePoints <= 0"
                    class="flex items-center justify-center w-24 px-4 text-[10px] font-bold text-white uppercase transition rounded-lg bg-black hover:bg-gray-800 disabled:bg-gray-300"
                  >
                    {{ $t("payment.use") }}
                  </button>
                  <button
                    v-else
                    type="button"
                    @click="handleRemovePoints"
                    class="w-24 px-4 text-[10px] font-bold text-red-600 uppercase transition border border-red-200 rounded-lg bg-red-50 hover:bg-red-100"
                  >
                    {{ $t("payment.cancel") }}
                  </button>
                </form>
                <div
                  v-if="pointsUsed > 0"
                  class="flex items-center justify-between mt-3 animate-fade-in"
                >
                  <span
                    class="text-[10px] font-bold tracking-widest text-gray-500 uppercase"
                  >
                    {{ $t("payment.points_applied") }} ({{ pointsUsed }} Pts)
                  </span>
                  <span class="text-[11px] font-medium text-emerald-600">
                    - {{ formatCurrencyDisplay(appliedPointDiscountObj) }}
                  </span>
                </div>
              </div>

              <div
                class="flex items-start justify-between pt-4 mt-2 text-gray-500 border-t border-gray-200 border-dashed"
              >
                <span>{{ $t("payment.shipping_cost") }}</span>
                <span v-if="shippingMethod === 'free'" class="font-bold text-green-600">
                  {{ $t("payment.free") }}
                </span>
                <div
                  v-else-if="shippingMethod === 'biteship' && selectedRate"
                  class="text-right"
                >
                  <span class="block font-medium text-gray-900">
                    {{ formatCurrencyDisplay(shippingCostActive) }}
                  </span>
                  <p class="mt-1 text-[10px] text-gray-400">
                    {{
                      formatCurrencyDisplay(
                        convertIDRtoActiveCurrency(selectedRate.price)
                      )
                    }}
                    x {{ checkoutCount }} item
                  </p>
                </div>
                <span v-else class="italic text-[10px]">{{
                  $t("payment.select_method")
                }}</span>
              </div>

              <div
                class="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-100"
              >
                <span class="mt-1 text-xs tracking-widest uppercase">
                  {{ $t("payment.grand_total") }}
                </span>
                <span class="text-xl text-black">
                  {{ formatCurrencyDisplay(grandTotalObj) }}
                </span>
              </div>

              <div
                v-if="userData?.is_membership"
                class="flex items-center gap-3 p-3 mt-4 border border-yellow-100 bg-yellow-50 rounded-xl"
              >
                <div
                  class="flex items-center justify-center w-8 h-8 text-white bg-yellow-400 rounded-full shrink-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    class="text-[10px] font-bold text-yellow-800 uppercase tracking-widest"
                  >
                    {{ $t("payment.points_to_earn") }}
                  </p>
                  <p class="text-sm font-black text-yellow-600">
                    +{{ calculateEarnedPoints }} Pts
                  </p>
                </div>
              </div>

              <button
                @click="handlePayment"
                :disabled="isButtonDisabled"
                class="mt-8 w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 py-5 rounded-2xl font-bold text-white text-xs uppercase tracking-[0.3em] transition-all duration-500 shadow-xl shadow-black/10"
              >
                <span v-if="!isProcessing">{{ $t("payment.pay_now") }}</span>
                <span v-else class="flex items-center justify-center gap-2">
                  <div
                    class="w-3 h-3 border-2 rounded-full border-white/30 border-t-white animate-spin"
                  ></div>
                  {{ $t("payment.processing") }}
                </span>
              </button>

              <p
                v-if="!selectedAddressId"
                class="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase"
              >
                {{ $t("payment.alert_no_address") }}
              </p>
              <p
                v-else-if="shippingMethod === 'biteship' && !selectedRate"
                class="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase"
              >
                {{ $t("payment.alert_no_courier") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 pt-10 pb-10 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in-up"
    >
      <div
        class="flex flex-col w-full max-w-5xl my-auto overflow-hidden bg-white shadow-2xl rounded-3xl"
      >
        <div
          class="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50 shrink-0 md:p-8 md:pb-6"
        >
          <h3 class="text-xl font-extrabold tracking-tight text-gray-900">
            {{
              editingId
                ? $t("payment.modal_edit_address_title")
                : $t("payment.modal_add_address_title")
            }}
          </h3>
          <button
            @click="isModalOpen = false"
            class="p-2 text-gray-400 transition-colors rounded-full hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
          >
            ✕
          </button>
        </div>

        <div class="flex flex-col md:flex-row h-auto md:h-[650px] overflow-hidden">
          <div
            class="relative w-full bg-gray-100 border-b border-gray-200 h-72 md:h-full md:w-5/12 md:border-b-0 md:border-r shrink-0"
          >
            <MapContainer
              :center="mapPosition"
              :zoom="15"
              style="height: 100%; width: 100%"
              :scrollWheelZoom="true"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker :position="mapPosition">
                <Popup>{{ $t("payment.popup_selected_location") }}</Popup>
              </Marker>
              <MapEvents />
              <MapCenterUpdater :position="mapPosition" />
            </MapContainer>

            <button
              type="button"
              @click="handleGetCurrentLocation"
              :disabled="isGettingLocation"
              class="absolute z-[1000] bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:-translate-x-0 md:right-6 flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full shadow-xl font-bold text-xs hover:bg-gray-50 border border-gray-200 transition-all hover:-translate-y-0.5"
            >
              <span
                v-if="isGettingLocation"
                class="w-4 h-4 border-2 rounded-full border-black border-t-transparent animate-spin"
              ></span>
              <svg
                v-else
                class="w-4 h-4 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {{ $t("payment.btn_use_current_location") }}
            </button>
          </div>

          <form
            @submit.prevent="handleSubmitAddress"
            class="flex flex-col flex-1 p-6 space-y-6 overflow-y-auto bg-white sm:p-8 custom-scrollbar"
          >
            <div class="flex gap-3 p-4 border border-blue-100 rounded-2xl bg-blue-50/50">
              <svg
                class="w-5 h-5 text-blue-500 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p class="text-xs leading-relaxed text-blue-800">
                {{ $t("payment.guide_map_text") }}
              </p>
            </div>

            <div class="space-y-5">
              <div class="mb-4">
                <label
                  class="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase"
                  >Country / Region</label
                >
                <select
                  v-model="formData.region"
                  @change="fetchProvinces"
                  class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-black focus:ring-1 focus:ring-black"
                  required
                >
                  <option v-for="c in countries" :key="c.isoCode" :value="c.name">
                    {{ c.name }}
                  </option>
                </select>
              </div>

              <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    class="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                    >{{ $t("payment.label_first_name") }}</label
                  >
                  <input
                    type="text"
                    required
                    v-model="formData.first_name_address"
                    class="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                  />
                </div>
                <div>
                  <label
                    class="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                    >{{ $t("payment.label_last_name") }}</label
                  >
                  <input
                    type="text"
                    required
                    v-model="formData.last_name_address"
                    class="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  class="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                  >{{ $t("payment.label_address_type") }}</label
                >
                <select
                  v-model="formData.location_type"
                  class="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none bg-white transition-all"
                >
                  <option value="home">{{ $t("payment.option_home") }}</option>
                  <option value="office">{{ $t("payment.option_office") }}</option>
                  <option value="other">{{ $t("payment.option_other") }}</option>
                </select>
              </div>

              <div>
                <label
                  class="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                  >{{ $t("payment.label_full_address") }}</label
                >
                <textarea
                  required
                  rows="3"
                  :placeholder="$t('payment.placeholder_full_address')"
                  v-model="formData.address_location"
                  class="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none resize-none bg-white transition-all"
                ></textarea>
              </div>

              <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    class="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                    >{{ $t("payment.label_province") }}</label
                  >
                  <select
                    v-if="filteredProvinces.length > 0"
                    v-model="formData.province"
                    class="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none bg-white transition-all"
                    required
                  >
                    <option value="" disabled>{{ $t("payment.select_province") }}</option>
                    <option v-for="p in filteredProvinces" :key="p" :value="p">
                      {{ p }}
                    </option>
                  </select>
                  <input
                    v-else
                    v-model="formData.province"
                    placeholder="State/Province"
                    class="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none bg-white transition-all"
                    required
                  />
                </div>
                <div>
                  <label
                    class="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                    >{{ $t("payment.label_city") }}</label
                  >
                  <input
                    type="text"
                    required
                    v-model="formData.city"
                    class="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                  />
                </div>
                <div>
                  <label
                    class="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                    >{{ $t("payment.label_postal_code") }}</label
                  >
                  <input
                    type="text"
                    required
                    v-model="formData.postal_code"
                    class="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                  />
                </div>
              </div>

              <input type="hidden" v-model="formData.latitude" />
              <input type="hidden" v-model="formData.longitude" />

              <div
                class="flex items-center gap-3 p-4 mt-2 transition-colors border border-gray-200 cursor-pointer rounded-xl bg-gray-50 hover:bg-gray-100"
                @click="formData.is_default = !formData.is_default"
              >
                <input
                  type="checkbox"
                  id="is_default"
                  v-model="formData.is_default"
                  class="w-5 h-5 rounded cursor-pointer text-black focus:ring-black accent-black"
                  @click.stop
                />
                <label
                  for="is_default"
                  class="text-sm font-bold text-gray-800 cursor-pointer select-none"
                  @click.stop
                >
                  {{ $t("payment.label_set_default_address") }}
                </label>
              </div>
            </div>

            <div class="flex justify-end gap-3 pt-6 mt-auto border-t border-gray-100">
              <button
                type="button"
                @click="isModalOpen = false"
                class="px-6 py-3 text-sm font-bold text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200"
              >
                {{ $t("payment.btn_cancel") }}
              </button>
              <button
                type="submit"
                class="px-6 py-3 text-sm font-bold text-white transition-all shadow-md bg-black rounded-xl hover:bg-gray-800 hover:shadow-lg"
              >
                {{
                  editingId
                    ? $t("payment.btn_update_address")
                    : $t("payment.btn_save_address")
                }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { useCart } from "../../composables/useCart.js";
import { Country, State } from "country-state-city";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

const router = useRouter();
const getAxiosConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const { cartItems, checkoutCount, selectedItemIds, clearSelectedCart } = useCart();

const userData = ref(null);
const addresses = ref([]);
const selectedAddressId = ref(null);
const isProcessing = ref(false);
const shippingMethod = ref("free");
const selectedRate = ref(null);
const isLoadingRates = ref(false);
const deliveryType = ref("now");
const deliveryDate = ref("");
const deliveryTime = ref("");

const promoInput = ref("");
const appliedPromoCode = ref(null);
const promoDiscountAmount = ref(0);
const appliedPromoType = ref(null);
const promoMessage = ref("");
const promoSuccess = ref(false);
const isVerifyingPromo = ref(false);

const availablePoints = ref(0);
const pointsInput = ref("");
const pointsUsed = ref(0);
const pointConversionRate = 1000;

const rawShippingRates = ref([]);
const isPageLoading = ref(true);

const useMemberVoucher = ref(false);
const MEMBER_VOUCHER_CODE = "SOLHERMEMBER";
const MEMBER_MIN_SPEND = 1000000;
const userType = ref("guest");

// ==========================================
// 1. DATA CROSS REFERENCING & MULTI-CURRENCY
// ==========================================
const catalogProducts = ref([]);
const isCatalogLoaded = ref(false);

const currentCurrency = ref(localStorage.getItem("currency") || "IDR");
const exchangeRates = ref({ IDR: 1 });

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
};

onMounted(async () => {
  window.addEventListener("currency-changed", updateCurrencyState);
  window.addEventListener("storage", (e) => {
    if (e.key === "currency") updateCurrencyState();
  });

  try {
    const res = await axios.get(`${BASE_URL}/exchange-rates`);
    if (res.data && res.data.data && res.data.data.rates) {
      exchangeRates.value = res.data.data.rates;
    }
  } catch (error) {
    console.error("Exchange rates error", error);
  }

  fetchData();
});

const getPriceToDisplay = (product) => {
  const curr = currentCurrency.value;
  if (curr === "IDR") return { value: Number(product.price), curr: "IDR" };
  try {
    const pricesObj =
      typeof product.prices === "string"
        ? JSON.parse(product.prices)
        : product.prices || {};
    const dbPrice =
      pricesObj[curr] || pricesObj[curr.toLowerCase()] || pricesObj[curr.toUpperCase()];
    if (dbPrice) return { value: parseFloat(dbPrice), curr: curr };
  } catch (e) {}
  return { value: Number(product.price), curr: "IDR" };
};

const getDiscountToDisplay = (product) => {
  const curr = currentCurrency.value;
  if (curr === "IDR")
    return product.discount_price
      ? { value: Number(product.discount_price), curr: "IDR" }
      : null;
  try {
    const discObj =
      typeof product.discount_prices === "string"
        ? JSON.parse(product.discount_prices)
        : product.discount_prices || {};
    const dbDisc =
      discObj[curr] ||
      discObj[curr.toLowerCase()] ||
      discObj[currentCurrency.toUpperCase()];
    if (dbDisc) return { value: parseFloat(dbDisc), curr: curr };
  } catch (e) {}
  return product.discount_price
    ? { value: Number(product.discount_price), curr: "IDR" }
    : null;
};

const formatCurrencyDisplay = (priceObj) => {
  if (!priceObj) return "";
  const { value, curr } = priceObj;
  const symbols = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
  const formatter = new Intl.NumberFormat(curr === "IDR" ? "id-ID" : "en-US", {
    minimumFractionDigits: curr === "IDR" ? 0 : 2,
    maximumFractionDigits: curr === "IDR" ? 0 : 2,
  });
  return `${symbols[curr] || curr + " "}${formatter.format(value)}`;
};

const getActivePriceObj = (product) => {
  const isReseller = userType.value === "reseller";
  const wholesale = Number(product.wholesale_price) || 0;
  const voucher = Number(product.voucher_discount_price) || 0;

  if (appliedPromoType.value === "voucher" && voucher > 0) {
    return { value: voucher, curr: "IDR" };
  }

  const dynamicPriceObj = getPriceToDisplay(product);
  const dynamicDiscountObj = getDiscountToDisplay(product);

  if (isReseller && wholesale > 0 && checkoutCount.value >= 24) {
    return { value: wholesale, curr: "IDR" };
  } else if (
    dynamicDiscountObj &&
    dynamicDiscountObj.value > 0 &&
    dynamicDiscountObj.value < dynamicPriceObj.value
  ) {
    return dynamicDiscountObj;
  }
  return dynamicPriceObj;
};

const convertIDRtoActiveCurrency = (idrAmount) => {
  const curr = currentCurrency.value;
  if (curr === "IDR" || !exchangeRates.value[curr]) {
    return { value: idrAmount, curr: "IDR" };
  }
  return { value: idrAmount * exchangeRates.value[curr], curr: curr };
};

const getFreshProduct = (cartProduct) => {
  if (catalogProducts.value.length > 0 && cartProduct) {
    const fresh = catalogProducts.value.find(
      (p) => p.id === cartProduct.id || p.id === cartProduct.product_id
    );
    if (fresh) return fresh;
  }
  return cartProduct;
};

// ==========================================
// 2. KUMPULAN HELPER FUNCTION
// ==========================================
const parseColorName = (colorString) => {
  if (!colorString) return "";
  return colorString.includes("|") ? colorString.split("|")[0] : colorString;
};
const parseColorHex = (colorString) => {
  let hex = colorString;
  try {
    const parsed = JSON.parse(colorString);
    if (parsed.hex) hex = parsed.hex;
  } catch {}
  return hex;
};

const imageErrors = ref({});
const handleImageError = (company) => {
  imageErrors.value[company] = true;
};

const destinationInfo = computed(() => {
  if (!selectedAddressId.value || !addresses.value) return null;
  const addr = addresses.value.find((a) => a.id === selectedAddressId.value);
  if (!addr) return null;

  return {
    name: addr.receiver?.full_name || "Unknown",
    phone: userData.value?.phone || "No Phone Provided",
    address: `${addr.details?.location || ""}, ${addr.details?.city || ""}, ${
      addr.details?.province || ""
    }`,
    postal_code: addr.postal_code || addr.details?.postal_code || "",
    country: addr.region || addr.details?.region || "Indonesia",
  };
});

const getCourierLogo = (company) => {
  const baseUrl = "/courier_images/";
  const map = {
    jne: "jne.png",
    sicepat: "sicepat.png",
    jnt: "jnt.png",
    anteraja: "anteraja.png",
    gojek: "gojek.png",
    grab: "grab.png",
    paxel: "paxel.png",
    ninja: "ninja.png",
    dhl: "dhl.png",
  };
  return map[company.toLowerCase()] ? baseUrl + map[company.toLowerCase()] : null;
};

// Data & Logika Modal Form Alamat
const isModalOpen = ref(false);
const countries = ref(Country.getAllCountries());
const filteredProvinces = ref([]);
const form = ref({
  id: null,
  region: "Indonesia",
  first_name_address: "",
  last_name_address: "",
  address_location: "",
  location_type: "",
  city: "",
  province: "",
  postal_code: "",
  latitude: null,
  longitude: null,
  is_default: true,
});

const fetchProvinces = () => {
  const selectedCountry = countries.value.find((c) => c.name === form.value.region);
  if (selectedCountry) {
    const states = State.getStatesOfCountry(selectedCountry.isoCode);
    filteredProvinces.value = states.map((s) => s.name);
  } else {
    filteredProvinces.value = [];
  }
};

const openModal = () => {
  form.value = {
    region: "Indonesia",
    is_default: true,
    first_name_address: userData.value?.first_name || "",
    last_name_address: userData.value?.last_name || "",
    address_location: "",
    location_type: "",
    city: "",
    province: "",
    postal_code: "",
    latitude: null,
    longitude: null,
  };
  fetchProvinces();
  isModalOpen.value = true;
};

// Map Logics
const mapPosition = ref([-6.175392, 106.827153]);
const isGettingLocation = ref(false);

const handleGetCurrentLocation = () => {
  setIsGettingLocation(true);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        mapPosition.value = [lat, lng];
        fetchAddressFromCoords(lat, lng);
        setIsGettingLocation(false);
      },
      () => {
        Swal.fire("Akses Ditolak", "Gagal mendapatkan lokasi.", "warning");
        setIsGettingLocation(false);
      }
    );
  }
};

const fetchAddressFromCoords = async (lat, lng) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await res.json();
    if (data && data.address) {
      const { address } = data;
      form.value = {
        ...form.value,
        latitude: lat.toString(),
        longitude: lng.toString(),
        address_location: address.road
          ? `${address.road} ${address.house_number || ""}`.trim()
          : data.display_name,
        city: address.city || address.town || address.county || "",
        province: address.state || "",
        region: address.country || "Indonesia",
        postal_code: address.postcode || "",
      };
    }
  } catch (error) {}
};

// ==========================================
// 3. COMPUTED TOTALS
// ==========================================
const checkoutItems = computed(() => {
  let baseItems = cartItems.value.filter((item) =>
    selectedItemIds.value.includes(item.id)
  );
  if (catalogProducts.value.length > 0) {
    baseItems = baseItems.map((item) => {
      const freshProduct = catalogProducts.value.find((p) => p.id === item.product_id);
      if (freshProduct) return { ...item, product: freshProduct };
      return item;
    });
  }
  return baseItems;
});

const baseIDRSubtotal = computed(() => {
  return checkoutItems.value.reduce((sum, item) => {
    const price =
      item.product.discount_price && item.product.discount_price < item.product.price
        ? item.product.discount_price
        : item.product.price;
    return sum + price * item.quantity;
  }, 0);
});

const localSubtotalObj = computed(() => {
  const curr = currentCurrency.value;
  const totalVal = checkoutItems.value.reduce((total, item) => {
    const activeObj = getActivePriceObj(item.product, checkoutCount.value);
    let val = activeObj.value;
    if (activeObj.curr === "IDR" && curr !== "IDR") {
      val = val * (exchangeRates.value[curr] || 1);
    }
    return total + val * item.quantity;
  }, 0);
  return { value: totalVal, curr: curr };
});

const shippingCostIDR = computed(() => {
  return shippingMethod.value === "biteship" && selectedRate.value
    ? parseFloat(selectedRate.value.price) * checkoutCount.value
    : 0;
});
const shippingCostActive = computed(() =>
  convertIDRtoActiveCurrency(shippingCostIDR.value)
);

const actualPromoDiscountIDR = computed(() => {
  if (appliedPromoType.value === "claim") {
    const productDiscount = Math.floor(baseIDRSubtotal.value * 0.1);
    const shippingSubsidy = Math.min(10000, shippingCostIDR.value);
    return productDiscount + shippingSubsidy;
  }
  return promoDiscountAmount.value;
});
const actualPromoDiscountObj = computed(() =>
  convertIDRtoActiveCurrency(actualPromoDiscountIDR.value)
);

const maxPointsAllowed = computed(() => {
  if (!userData.value || baseIDRSubtotal.value === 0) return 0;
  const userBalance = userData.value.point || 0;
  const priceAfterPromo = baseIDRSubtotal.value - actualPromoDiscountIDR.value;
  const maxPointsForPrice = Math.floor(
    Math.max(0, priceAfterPromo) / pointConversionRate
  );
  return Math.min(userBalance, maxPointsForPrice);
});

const appliedPointDiscountIDR = computed(
  () => (pointsUsed.value || 0) * pointConversionRate
);
const appliedPointDiscountObj = computed(() =>
  convertIDRtoActiveCurrency(appliedPointDiscountIDR.value)
);

const grandTotalObj = computed(() => {
  return {
    value:
      localSubtotalObj.value.value +
      shippingCostActive.value.value -
      actualPromoDiscountObj.value.value -
      appliedPointDiscountObj.value.value,
    curr: currentCurrency.value,
  };
});

const processedShippingRates = computed(() => {
  if (!rawShippingRates.value || rawShippingRates.value.length === 0) return [];
  return rawShippingRates.value.map((rate) => {
    const isShippo = rate.provider !== undefined;
    return {
      ...rate,
      company: isShippo ? rate.provider : rate.company,
      type: isShippo ? rate.service_name : rate.type,
      duration: isShippo ? rate.etd : rate.duration,
      courier_name: isShippo ? "Global Express" : rate.courier_name,
      price: rate.price,
      is_disabled: false,
      disable_reason: "",
    };
  });
});

// ==========================================
// 4. API ACTIONS
// ==========================================
const saveAddress = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/addresses`, form.value, getAxiosConfig());
    isModalOpen.value = false;
    const resAddr = await axios.get(`${BASE_URL}/addresses`, getAxiosConfig());
    addresses.value = resAddr.data.data;
    selectedAddressId.value =
      res.data.id || res.data.data?.id || addresses.value[addresses.value.length - 1].id;
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Address Saved!",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (e) {
    Swal.fire("Error", "Failed to save address", "error");
  }
};

const handlePayment = async () => {
  isProcessing.value = true;
  try {
    const payload = {
      address_id: selectedAddressId.value,
      shipping_method: shippingMethod.value,
      use_points: pointsUsed.value,
      cart_ids: selectedItemIds,
      courier_company:
        shippingMethod.value === "biteship" ? selectedRate.value?.company : null,
      courier_type: shippingMethod.value === "biteship" ? selectedRate.value?.type : null,
      shipping_cost:
        shippingMethod.value === "biteship" ? selectedRate.value?.price : null,
      delivery_type: shippingMethod.value === "biteship" ? deliveryType.value : null,
      delivery_date: shippingMethod.value === "biteship" ? deliveryDate.value : null,
      delivery_time: shippingMethod.value === "biteship" ? deliveryTime.value : null,
      promo_code: appliedPromoCode.value,
      promo_type: appliedPromoType.value,
      currency: currentCurrency.value,
      referral_code: localStorage.getItem("affiliate_ref"),
    };
    const res = await axios.post(`${BASE_URL}/checkout`, payload, getAxiosConfig());
    if (res.data.checkout_url) {
      clearSelectedCart();
      window.location.href = res.data.checkout_url;
    }
  } catch (error) {
    Swal.fire(
      "Payment Error",
      error.response?.data?.message || "Failed to create invoice",
      "error"
    );
  } finally {
    isProcessing.value = false;
  }
};

const fetchData = async () => {
  try {
    const user = localStorage.getItem("user_data");
    if (user) {
      userData.value = JSON.parse(user);
      setUserType(userData.value.usertype || "user");
      setAvailablePoints(userData.value.point || 0);
    }
    const resAddr = await axios.get(`${BASE_URL}/addresses`, getAxiosConfig());
    addresses.value = resAddr.data.data;
    if (addresses.value.length > 0) {
      const defaultAddr = addresses.value.find((a) => a.is_default);
      selectedAddressId.value = defaultAddr ? defaultAddr.id : addresses.value[0].id;
    }

    // Load Catalog
    const resCatalog = await axios.get(`${BASE_URL}/products`);
    setCatalogProducts(resCatalog.data.data || resCatalog.data);
    setIsCatalogLoaded(true);

    const now = new Date();
    now.setHours(now.getHours() + 1);
    deliveryDate.value = now.toISOString().split("T")[0];
    deliveryTime.value = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;
    isPageLoading.value = false;
  } catch (error) {
    isPageLoading.value = false;
  }
};

watch(selectedAddressId, async (newVal) => {
  if (newVal && selectedItemIds.length > 0 && shippingMethod.value === "biteship") {
    selectedRate.value = null;
    isLoadingRates.value = true;
    rawShippingRates.value = [];
    try {
      const res = await axios.post(
        `${BASE_URL}/shipping/rates`,
        { address_id: newVal, cart_ids: selectedItemIds },
        getAxiosConfig()
      );
      if (res.data && res.data.data) rawShippingRates.value = res.data.data;
      else if (res.data && res.data.rates) rawShippingRates.value = res.data.rates;
      else if (res.data && res.data.pricing) rawShippingRates.value = res.data.pricing;
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to calculate shipping.",
        showConfirmButton: false,
        timer: 4000,
      });
    } finally {
      isLoadingRates.value = false;
    }
  }
});

const calculateEarnedPoints = computed(() => Math.floor(baseIDRSubtotal.value / 100000));

const handleMemberToggle = async () => {
  if (useMemberVoucher.value) {
    if (baseIDRSubtotal.value < MEMBER_MIN_SPEND) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "warning",
        title: `Min. spend is Rp ${MEMBER_MIN_SPEND.toLocaleString("id-ID")}`,
        showConfirmButton: false,
        timer: 3000,
      });
      useMemberVoucher.value = false;
      return;
    }
    promoInput.value = MEMBER_VOUCHER_CODE;
    await applyPromo();
    if (!promoSuccess.value) useMemberVoucher.value = false;
  } else {
    if (appliedPromoCode.value === MEMBER_VOUCHER_CODE) removePromo();
  }
};

const applyPromo = async () => {
  if (!promoInput.value) return;
  isVerifyingPromo.value = true;
  try {
    const codeToBeApplied = promoInput.value.toUpperCase();
    const res = await axios.post(
      `${BASE_URL}/promo/verify`,
      {
        promo_code: codeToBeApplied,
        cart_items: checkoutItems.value.map((item) => ({ product_id: item.product_id })),
      },
      getAxiosConfig()
    );
    if (
      codeToBeApplied === MEMBER_VOUCHER_CODE &&
      baseIDRSubtotal.value < MEMBER_MIN_SPEND
    )
      throw new Error(`Minimum spend is Rp ${MEMBER_MIN_SPEND.toLocaleString("id-ID")}`);
    else if (codeToBeApplied !== MEMBER_VOUCHER_CODE && baseIDRSubtotal.value < 499000)
      throw new Error("Minimum spend is Rp 499.000");
    promoSuccess.value = true;
    promoMessage.value = "✅ " + res.data.message;
    appliedPromoCode.value = codeToBeApplied;
    promoDiscountAmount.value = Math.min(res.data.discount_value, baseIDRSubtotal.value);
    if (appliedPromoCode.value === MEMBER_VOUCHER_CODE) useMemberVoucher.value = true;
    if (pointsToUse.value > maxUsablePoints.value)
      pointsToUse.value = maxUsablePoints.value;
  } catch (error) {
    promoSuccess.value = false;
    promoMessage.value =
      "❌ " + (error.response?.data?.message || error.message || "Invalid promo code.");
    appliedPromoCode.value = null;
    promoDiscountAmount.value = 0;
    useMemberVoucher.value = false;
  } finally {
    isVerifyingPromo.value = false;
  }
};

const removePromo = () => {
  promoInput.value = "";
  appliedPromoCode.value = null;
  promoDiscountAmount.value = 0;
  promoMessage.value = "";
  promoSuccess.value = false;
  useMemberVoucher.value = false;
};
const handleApplyPoints = (e) => {
  e.preventDefault();
  const ptsToUse = Number(pointsInput.value);
  if (ptsToUse > availablePoints.value)
    return Swal.fire(
      "Peringatan",
      `Anda hanya memiliki ${availablePoints.value} poin.`,
      "warning"
    );
  if (ptsToUse > maxPointsAllowed.value) {
    pointsInput.value = maxPointsAllowed.value;
    pointsUsed.value = maxPointsAllowed.value;
    return;
  }
  pointsUsed.value = ptsToUse;
};
const handleRemovePoints = () => {
  pointsInput.value = "";
  pointsUsed.value = 0;
};
const useAllPoints = () => {
  pointsInput.value = maxPointsAllowed.value;
  pointsUsed.value = maxPointsAllowed.value;
};
const isButtonDisabled = computed(() => {
  if (isProcessing.value || cartItems.value.length === 0 || !selectedAddressId.value)
    return true;
  if (shippingMethod.value === "biteship") {
    if (!selectedRate.value) return true;
    if (
      deliveryType.value === "scheduled" &&
      (!deliveryDate.value || !deliveryTime.value)
    )
      return true;
  }
  return false;
});

const MapEventsComp = {
  setup() {
    useMapEvents({
      click(e) {
        setMapPosition([e.latlng.lat, e.latlng.lng]);
        fetchAddressFromCoords(e.latlng.lat, e.latlng.lng);
      },
    });
    return () => null;
  },
};
const MapCenterUpdater = {
  props: ["position"],
  setup(props) {
    const mapObj = useMap();
    watch(
      () => props.position,
      (newPos) => {
        mapObj.setView(newPos, mapObj.getZoom());
      }
    );
    return () => null;
  },
};
</script>

<style scoped>
.animate-bounce-1 {
  animation: bounceDots 1.4s infinite ease-in-out both;
  animation-delay: -0.32s;
}
.animate-bounce-2 {
  animation: bounceDots 1.4s infinite ease-in-out both;
  animation-delay: -0.16s;
}
.animate-bounce-3 {
  animation: bounceDots 1.4s infinite ease-in-out both;
}
@keyframes bounceDots {
  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style> -->
<template>
  <div
    v-if="isPageLoading"
    class="z-[100] fixed inset-0 flex flex-col justify-center items-center bg-white"
  >
    <div class="flex gap-2 mb-4">
      <div class="w-3 h-3 bg-black rounded-full animate-bounce-1"></div>
      <div class="w-3 h-3 bg-black rounded-full animate-bounce-2"></div>
      <div class="w-3 h-3 bg-black rounded-full animate-bounce-3"></div>
    </div>
    <p class="font-serif text-sm italic tracking-widest text-gray-500 animate-pulse">
      {{ $t("payment.prepare_checkout") }}
    </p>
  </div>

  <div v-else class="max-w-6xl min-h-screen px-6 py-12 mx-auto md:py-24 animate-fade-in">
    <div v-if="checkoutItems.length === 0" class="py-20 text-center">
      <h2 class="mb-4 font-serif text-3xl">{{ $t("payment.bag_empty") }}</h2>
      <button
        @click="$router.push('/collections')"
        class="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase bg-black rounded-full"
      >
        {{ $t("payment.return_shop") }}
      </button>
    </div>

    <div v-else>
      <h1 class="mb-12 font-serif text-3xl tracking-tighter uppercase md:text-4xl">
        {{ $t("payment.checkout") }}
      </h1>

      <div class="flex flex-col gap-12 lg:flex-row">
        <div class="flex-grow space-y-12">
          <section>
            <div class="flex items-center gap-4 mb-4">
              <span
                class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
                >1</span
              >
              <h2 class="text-sm font-bold tracking-widest text-gray-900 uppercase">
                {{ $t("payment.shipping_address") }}
              </h2>
            </div>

            <div
              v-if="addresses.length === 0"
              class="py-10 text-center border border-gray-300 border-dashed bg-gray-50 rounded-2xl"
            >
              <p class="mb-2 text-sm italic text-gray-500">
                {{ $t("payment.no_address_found") }}
              </p>
              <button
                @click="openModal()"
                class="text-xs font-bold text-blue-600 underline"
              >
                {{ $t("payment.add_new_address") }}
              </button>
            </div>
            <div v-else class="space-y-4">
              <label
                v-for="addr in addresses"
                :key="addr.id"
                :class="[
                  selectedAddressId === addr.id
                    ? 'border-black ring-1 ring-black bg-white shadow-md'
                    : 'border-gray-100 bg-gray-50/50',
                ]"
                class="relative flex items-start p-6 transition-all border cursor-pointer rounded-2xl hover:bg-white"
              >
                <input
                  type="radio"
                  name="address"
                  :value="addr.id"
                  v-model="selectedAddressId"
                  class="w-4 h-4 mt-1 text-black border-gray-300 focus:ring-black"
                />
                <div class="flex-grow ml-4">
                  <div class="flex justify-between">
                    <p class="text-sm font-bold text-gray-900 uppercase">
                      {{ addr.receiver.full_name }}
                    </p>
                    <span
                      v-if="addr.is_default"
                      class="text-[9px] bg-gray-200 px-2 py-0.5 rounded font-bold uppercase"
                      >{{ $t("payment.default") }}</span
                    >
                  </div>
                  <p class="mt-2 text-sm leading-relaxed text-gray-600">
                    {{ addr.details.location }}, {{ addr.details.type }} <br />
                    {{ addr.details.city }}, {{ addr.details.province }} <br />
                    {{ addr.details.region }} - {{ addr.details.postal_code }}
                  </p>
                </div>
              </label>
              <button
                @click="openModal()"
                class="mt-4 text-xs font-bold text-gray-500 underline hover:text-black"
              >
                {{ $t("payment.add_another_address") }}
              </button>
            </div>
          </section>

          <section v-if="!selectedAddressId">
            <div class="flex items-center gap-4 mb-4">
              <span
                class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
                >2</span
              >
              <h2 class="text-sm font-bold tracking-widest text-gray-900 uppercase">
                {{ $t("payment.shipping_method") }}
              </h2>
            </div>

            <div>
              <h4 class="text-sm tracking-widest text-gray-900 uppercase">
                {{ $t("payment.choose_shipping_address") }}
              </h4>
            </div>
          </section>

          <section v-if="selectedAddressId">
            <div class="flex items-center gap-4 mb-4">
              <span
                class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
                >2</span
              >
              <h2 class="text-sm font-bold tracking-widest text-gray-900 uppercase">
                {{ $t("payment.shipping_method") }}
              </h2>
            </div>

            <div class="space-y-4">
              <label
                v-if="destinationInfo?.country === 'Indonesia'"
                :class="[
                  shippingMethod === 'free'
                    ? 'border-black ring-1 ring-black bg-white shadow-md'
                    : 'border-gray-100 bg-gray-50/50',
                ]"
                class="relative flex items-center p-6 transition-all border cursor-pointer rounded-2xl"
              >
                <input
                  type="radio"
                  value="free"
                  v-model="shippingMethod"
                  class="w-4 h-4 text-black border-gray-300 focus:ring-black"
                />
                <div class="flex items-center justify-between flex-grow ml-4">
                  <div>
                    <p class="text-sm font-bold tracking-wide text-gray-900 uppercase">
                      {{ $t("payment.free_shipping") }}
                    </p>
                    <p class="mt-1 text-xs font-bold text-green-600">
                      {{ $t("payment.in_store") }}
                    </p>
                  </div>
                  <p class="font-black text-black">{{ $t("payment.price") }}</p>
                </div>
              </label>

              <label
                :class="[
                  shippingMethod === 'biteship'
                    ? 'border-black ring-1 ring-black bg-white shadow-md'
                    : 'border-gray-100 bg-gray-50/50',
                ]"
                class="relative flex items-center p-6 transition-all border cursor-pointer rounded-2xl"
              >
                <input
                  type="radio"
                  value="biteship"
                  v-model="shippingMethod"
                  class="w-4 h-4 text-black border-gray-300 focus:ring-black"
                />
                <div class="flex items-center justify-between flex-grow ml-4">
                  <div>
                    <p class="text-sm font-bold tracking-wide text-gray-900 uppercase">
                      {{ $t("payment.standard") }}
                    </p>
                    <p class="mt-1 text-xs text-gray-500">
                      {{
                        destinationInfo?.country === "Indonesia"
                          ? $t("payment.powered_by_biteship")
                          : "International Express Delivery"
                      }}
                    </p>
                  </div>
                </div>
              </label>

              <div
                v-if="shippingMethod === 'biteship'"
                class="p-6 mt-4 space-y-8 bg-white border border-gray-200 rounded-3xl animate-fade-in"
              >
                <div
                  class="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 bg-gray-50 rounded-2xl"
                >
                  <div>
                    <h3
                      class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3"
                    >
                      {{ $t("payment.destination") }}
                    </h3>
                    <p class="text-xs font-bold text-gray-900 uppercase">
                      {{ destinationInfo?.name }}
                    </p>
                    <p class="mt-1 text-xs text-gray-500">
                      {{ destinationInfo?.phone }}
                    </p>
                    <p class="mt-1 text-xs text-gray-500 line-clamp-2">
                      {{ destinationInfo?.address }} -
                      {{ destinationInfo?.postal_code }}
                    </p>
                    <p class="mt-1 text-xs font-bold text-blue-600 uppercase">
                      {{ destinationInfo?.country }}
                    </p>
                  </div>
                </div>

                <div v-if="destinationInfo?.country === 'Indonesia'">
                  <h3 class="mb-4 text-sm font-bold tracking-widest uppercase">
                    {{ $t("payment.pickup_schedule") }}
                  </h3>

                  <div class="flex flex-col gap-4 mb-4 md:flex-row">
                    <label
                      :class="
                        deliveryType === 'now'
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200'
                      "
                      class="flex-1 p-4 transition border cursor-pointer rounded-xl"
                    >
                      <input
                        type="radio"
                        value="now"
                        v-model="deliveryType"
                        class="hidden"
                      />
                      <p class="text-xs font-bold uppercase">
                        {{ $t("payment.standard_pickup") }}
                      </p>
                      <p class="text-[10px] text-gray-500 mt-1">
                        {{ $t("payment.scheduled_pickup") }}
                      </p>
                    </label>
                    <label
                      :class="
                        deliveryType === 'scheduled'
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200'
                      "
                      class="flex-1 p-4 transition border cursor-pointer rounded-xl"
                    >
                      <input
                        type="radio"
                        value="scheduled"
                        v-model="deliveryType"
                        class="hidden"
                      />
                      <p class="text-xs font-bold uppercase">
                        {{ $t("payment.scheduled_pickup") }}
                      </p>
                      <p class="text-[10px] text-gray-500 mt-1">
                        {{ $t("payment.choose_specific_date_time") }}
                      </p>
                    </label>
                  </div>

                  <div
                    v-if="deliveryType === 'scheduled'"
                    class="flex gap-4 p-4 border border-blue-100 bg-blue-50/30 rounded-xl animate-fade-in"
                  >
                    <div class="flex-1">
                      <label
                        class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2"
                        >{{ $t("payment.pickup_date") }}</label
                      >
                      <input
                        type="date"
                        v-model="deliveryDate"
                        :min="todayDate"
                        class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-black focus:border-black"
                        required
                      />
                    </div>
                    <div class="flex-1">
                      <label
                        class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2"
                        >{{ $t("payment.pickup_time") }}</label
                      >
                      <input
                        type="time"
                        v-model="deliveryTime"
                        class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-black focus:border-black"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3
                    class="pt-6 mb-4 text-sm font-bold tracking-widest uppercase border-t"
                  >
                    {{ $t("payment.select_courier") }}
                  </h3>
                  <div
                    v-if="isLoadingRates"
                    class="py-4 text-sm text-center text-gray-500 animate-pulse"
                  >
                    {{ $t("payment.calculating_couriers") }}
                  </div>
                  <div
                    v-else-if="processedShippingRates.length === 0"
                    class="py-4 text-xs italic text-center text-red-500"
                  >
                    {{ $t("payment.no_courier_available") }}
                  </div>
                  <div v-else class="space-y-3">
                    <label
                      v-for="(rate, idx) in processedShippingRates"
                      :key="idx"
                      :class="[
                        rate.is_disabled
                          ? 'opacity-40 bg-gray-100 border-gray-200 pointer-events-none select-none'
                          : selectedRate?.company === rate.company &&
                            selectedRate?.type === rate.type
                          ? 'border-black bg-gray-50 shadow-sm'
                          : 'border-gray-200 hover:bg-gray-50 cursor-pointer transition-all',
                      ]"
                      class="relative flex flex-col p-4 border rounded-xl"
                    >
                      <div class="flex items-center w-full">
                        <input
                          type="radio"
                          :value="rate"
                          v-model="selectedRate"
                          :disabled="rate.is_disabled"
                          class="w-4 h-4 text-black border-gray-300 focus:ring-black disabled:opacity-50"
                        />
                        <div class="flex items-center flex-grow gap-4 ml-4">
                          <div
                            class="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0"
                          >
                            <img
                              v-show="!imageErrors[rate.company]"
                              v-if="getCourierLogo(rate.company)"
                              :src="getCourierLogo(rate.company)"
                              :alt="rate.company"
                              class="object-contain w-full h-full p-1"
                              @error="handleImageError(rate.company)"
                            />
                            <span
                              v-show="
                                imageErrors[rate.company] || !getCourierLogo(rate.company)
                              "
                              class="text-xs font-black text-gray-300"
                            >
                              {{ rate.company.toUpperCase() }}
                            </span>
                          </div>
                          <div>
                            <p
                              class="text-sm font-bold tracking-wide text-gray-800 uppercase"
                            >
                              {{ rate.company }} - {{ rate.type.replace("_", " ") }}
                            </p>
                            <p class="text-gray-500 text-[10px] mt-0.5">
                              {{ rate.courier_name }} ({{ rate.duration }})
                            </p>
                          </div>
                        </div>
                        <p class="text-sm font-black text-black">
                          {{
                            formatCurrencyDisplay(convertIDRtoActiveCurrency(rate.price))
                          }}
                        </p>
                      </div>

                      <div
                        v-if="rate.is_disabled"
                        class="mt-3 ml-8 text-[10px] text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 font-bold uppercase tracking-widest"
                      >
                        ⚠️ {{ $t("payment.unavailable") }} {{ rate.disable_reason }}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="lg:w-[400px] space-y-6">
          <div
            class="sticky p-8 bg-white border border-gray-100 shadow-xl rounded-3xl top-28"
          >
            <h2
              class="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200"
            >
              {{ $t("payment.order_summary") }}
            </h2>

            <div
              class="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar"
            >
              <div v-for="item in checkoutItems" :key="item.id" class="flex gap-4">
                <img
                  :src="item.product.image"
                  class="object-cover w-16 h-16 bg-gray-100 rounded-xl shrink-0"
                />
                <div class="flex-grow">
                  <div class="flex items-center gap-2">
                    <p
                      class="w-40 text-[11px] font-bold text-gray-900 uppercase truncate"
                      :title="item.product.name"
                    >
                      {{ item.product.name }}
                    </p>
                    <span
                      v-if="
                        userType === 'reseller' &&
                        Number(item.product.wholesale_price) > 0 &&
                        checkoutCount >= 24
                      "
                      class="px-1.5 py-0.5 text-[8px] font-bold text-white bg-blue-600 rounded"
                      >GROSIR</span
                    >
                  </div>
                  <div class="flex items-center gap-2 mt-0.5">
                    <p class="text-[10px] text-gray-400">Qty: {{ item.quantity }}</p>
                    <template v-if="item.color">
                      <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <div class="flex items-center gap-1.5">
                        <div
                          class="w-3 h-3 border border-gray-300 rounded-full shadow-sm shrink-0"
                          :style="{ backgroundColor: parseColorHex(item.color) }"
                        ></div>
                        <span class="text-[10px] font-bold text-gray-500 uppercase">
                          {{ parseColorName(item.color) }}
                        </span>
                      </div>
                    </template>
                  </div>

                  <p class="mt-1 text-xs font-medium text-gray-900">
                    {{
                      formatCurrencyDisplay({
                        value: getActivePriceObj(item.product).value * item.quantity,
                        curr: getActivePriceObj(item.product).curr,
                      })
                    }}
                  </p>
                </div>
              </div>
            </div>

            <div class="pt-4 space-y-3 text-sm border-t border-gray-50">
              <div class="flex justify-between text-gray-500">
                <span>{{ $t("payment.total_items") }}</span>
                <span class="font-bold text-gray-900"
                  >{{ checkoutCount }} {{ $t("payment.item") }}</span
                >
              </div>
              <div class="flex justify-between text-gray-500">
                <span>{{ $t("payment.subtotal") }}</span>
                <span
                  :class="
                    appliedPromoType === 'voucher' ? 'text-amber-600 font-bold' : ''
                  "
                >
                  {{ formatCurrencyDisplay(cartSubtotalObj) }}
                </span>
              </div>

              <div
                v-if="userData?.is_membership"
                class="pt-4 mt-2 border-t border-gray-200 border-dashed"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p
                      class="text-[10px] font-bold text-gray-900 uppercase tracking-widest flex items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-4 h-4 text-yellow-500"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      {{ $t("payment.vip_perks") }}
                    </p>
                    <p class="text-[10px] text-gray-500 mt-0.5">
                      {{ $t("payment.use_500k") }}
                    </p>
                    <p
                      v-if="checkoutTotalIDR < MEMBER_MIN_SPEND"
                      class="text-[8px] text-red-500 italic mt-0.5"
                    >
                      {{ $t("payment.min_spend") }}
                    </p>
                  </div>

                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="useMemberVoucher"
                      @change="handleMemberToggle"
                      class="sr-only peer"
                      :disabled="
                        isVerifyingPromo ||
                        (checkoutTotalIDR < MEMBER_MIN_SPEND && !useMemberVoucher)
                      "
                    />
                    <div
                      class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black disabled:opacity-50"
                    ></div>
                  </label>
                </div>
              </div>

              <div class="pt-4 mt-2 border-t border-gray-200 border-dashed">
                <label
                  class="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2 block"
                >
                  {{ $t("payment.promo_code") }}
                </label>
                <form @submit.prevent="applyPromo" class="flex gap-2">
                  <input
                    type="text"
                    v-model="promoInput"
                    :disabled="
                      appliedPromoCode !== null || isVerifyingPromo || useMemberVoucher
                    "
                    :placeholder="$t('payment.enter_promo_code')"
                    class="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm uppercase focus:ring-black outline-none disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
                  />
                  <button
                    v-if="!appliedPromoCode"
                    type="submit"
                    :disabled="!promoInput || isVerifyingPromo || useMemberVoucher"
                    class="bg-black text-white text-[10px] font-bold uppercase px-4 rounded-lg hover:bg-gray-800 transition disabled:bg-gray-300 w-20 flex justify-center items-center"
                  >
                    <span v-if="!isVerifyingPromo">{{ $t("payment.apply") }}</span>
                    <div
                      v-else
                      class="w-3 h-3 border-2 rounded-full border-white/40 border-t-white animate-spin"
                    ></div>
                  </button>
                  <button
                    v-else
                    type="button"
                    @click="removePromo"
                    class="bg-red-50 text-red-600 border border-red-200 text-[10px] font-bold uppercase px-4 rounded-lg hover:bg-red-100 transition w-20"
                  >
                    {{ $t("payment.remove") }}
                  </button>
                </form>
                <p
                  v-if="promoMessage"
                  :class="promoSuccess ? 'text-green-600' : 'text-red-500'"
                  class="text-[10px] mt-2 font-medium"
                >
                  {{ promoMessage }}
                </p>
                <div
                  v-if="appliedPromoCode"
                  class="flex justify-between text-[10px] md:text-xs font-medium text-emerald-600 mt-2"
                >
                  <span class="pr-2 truncate">
                    Promo (
                    <span class="font-mono uppercase">
                      {{ appliedPromoCode }}
                    </span>
                    )
                  </span>
                  <span>- {{ formatCurrencyDisplay(promoDiscountObj) }}</span>
                </div>
              </div>

              <div
                v-if="userData?.is_membership && userData?.point > 0"
                class="pt-4 mt-2 border-t border-gray-200 border-dashed"
              >
                <div class="flex items-center justify-between mb-2">
                  <span
                    class="text-[10px] font-bold text-yellow-800 uppercase tracking-widest flex items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-3 h-3 text-yellow-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    {{ $t("payment.redeem_points") }}
                  </span>
                  <span class="text-xs text-gray-500"
                    >{{ $t("payment.bal") }} {{ userData.point }} Pts</span
                  >
                </div>
                <div class="flex gap-2">
                  <input
                    type="number"
                    v-model="pointsToUse"
                    :max="maxUsablePoints"
                    min="0"
                    class="flex-1 bg-white border border-yellow-300 rounded-lg px-3 py-1.5 text-sm focus:ring-yellow-500 outline-none"
                    placeholder="0"
                  />
                  <button
                    @click="useAllPoints"
                    class="bg-yellow-100 text-yellow-800 text-[10px] font-bold uppercase px-3 rounded-lg hover:bg-yellow-200 transition"
                  >
                    {{ $t("payment.use_all") }}
                  </button>
                </div>
                <p
                  v-if="pointsToUse > 0"
                  class="text-[10px] text-green-600 mt-1 font-medium text-right"
                >
                  - {{ formatCurrencyDisplay(pointDiscountObj) }}
                </p>
              </div>

              <div class="flex items-start justify-between text-gray-500">
                <span>{{ $t("payment.shipping") }}</span>
                <span v-if="shippingMethod === 'free'" class="font-bold text-green-600">{{
                  $t("payment.free")
                }}</span>
                <div
                  v-else-if="shippingMethod === 'biteship' && selectedRate"
                  class="text-right"
                >
                  <span class="block font-medium text-gray-900">
                    {{
                      formatCurrencyDisplay({
                        value: shippingCostObj.value * checkoutCount,
                        curr: shippingCostObj.curr,
                      })
                    }}
                  </span>
                  <p class="mt-1 text-[10px] text-gray-400">
                    {{ formatCurrencyDisplay(shippingCostObj) }} x {{ checkoutCount }}
                    {{ $t("payment.item") }}
                  </p>
                </div>
                <span v-else class="italic text-[10px]">{{
                  $t("payment.select_method")
                }}</span>
              </div>

              <div
                class="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-200"
              >
                <span class="mt-1 text-xs tracking-widest uppercase">{{
                  $t("payment.grand_total")
                }}</span>
                <span class="text-xl text-gycora">
                  {{ formatCurrencyDisplay(grandTotalObj) }}
                </span>
              </div>

              <button
                @click="handlePayment"
                :disabled="isButtonDisabled"
                class="mt-8 w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 py-5 rounded-2xl font-bold text-white text-xs uppercase tracking-[0.3em] transition-all duration-500 shadow-xl shadow-black/10 flex justify-center items-center"
              >
                <span v-if="!isProcessing">{{ $t("payment.pay_now") }}</span>
                <span v-else class="flex items-center justify-center gap-2">
                  <div
                    class="w-3 h-3 border-2 rounded-full border-white/30 border-t-white animate-spin"
                  ></div>
                  {{ $t("payment.processing") }}
                </span>
              </button>

              <p
                v-if="!selectedAddressId"
                class="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase"
              >
                {{ $t("payment.select_shipping_address") }}
              </p>
              <p
                v-else-if="shippingMethod === 'biteship' && !selectedRate"
                class="mt-4 text-[10px] tracking-tighter text-center text-red-500 uppercase"
              >
                {{ $t("payment.select_courier_service") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 pt-10 pb-10 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in-up"
    >
      <div
        class="flex flex-col w-full max-w-5xl my-auto overflow-hidden bg-white shadow-2xl rounded-3xl"
      >
        <div
          class="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50 shrink-0 md:p-8 md:pb-6"
        >
          <h3 class="text-xl font-extrabold tracking-tight text-gray-900">
            {{
              editingId ? $t("modal_edit_address_title") : $t("modal_add_address_title")
            }}
          </h3>
          <button
            @click="isModalOpen = false"
            class="p-2 text-gray-400 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
          >
            ✕
          </button>
        </div>

        <div class="flex flex-col md:flex-row h-auto md:h-[650px] overflow-hidden">
          <div
            class="relative w-full bg-gray-100 border-b border-gray-200 h-72 md:h-full md:w-5/12 md:border-b-0 md:border-r shrink-0"
          >
            <l-map
              ref="map"
              v-model:zoom="zoom"
              :center="center"
              :use-global-leaflet="false"
              @click="onMapClick"
              style="height: 100%; width: 100%"
            >
              <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
              ></l-tile-layer>
              <l-marker
                :lat-lng="markerLatLng"
                draggable
                @update:latLng="onMarkerDrag"
              ></l-marker>
            </l-map>

            <button
              type="button"
              @click="getCurrentLocation"
              :disabled="isGettingLocation"
              class="absolute z-[1000] bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:-translate-x-0 md:right-6 flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-full shadow-xl font-bold text-xs hover:bg-gray-50 border border-gray-200 transition-all hover:-translate-y-0.5"
            >
              <span
                v-if="isGettingLocation"
                class="w-4 h-4 border-2 rounded-full border-[#006A4E] border-t-transparent animate-spin"
              ></span>
              <svg
                v-else
                class="w-4 h-4 text-[#006A4E]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {{ $t("payment.current_loc") }}
            </button>
          </div>

          <form
            @submit.prevent="saveAddress"
            class="flex flex-col flex-1 p-6 space-y-6 overflow-y-auto bg-white sm:p-8 custom-scrollbar"
          >
            <div class="flex gap-3 p-4 border border-blue-100 rounded-2xl bg-blue-50/50">
              <svg
                class="w-5 h-5 text-blue-500 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p class="text-xs leading-relaxed text-blue-800">
                {{ $t("guide_map_text") }}
              </p>
            </div>

            <div class="space-y-5">
              <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    class="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                    >{{ $t("label_first_name") }}</label
                  >
                  <input
                    type="text"
                    required
                    v-model="form.first_name_address"
                    class="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
                  />
                </div>
                <div>
                  <label
                    class="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                    >{{ $t("label_last_name") }}</label
                  >
                  <input
                    type="text"
                    required
                    v-model="form.last_name_address"
                    class="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  class="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                  >{{ $t("label_address_type") }}</label
                >
                <select
                  v-model="form.location_type"
                  class="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none bg-white transition-all"
                >
                  <option value="home">{{ $t("option_home") }}</option>
                  <option value="office">{{ $t("option_office") }}</option>
                  <option value="other">{{ $t("option_other") }}</option>
                </select>
              </div>

              <div>
                <label
                  class="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                  >{{ $t("label_full_address") }}</label
                >
                <textarea
                  required
                  rows="3"
                  v-model="form.address_location"
                  class="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none resize-none bg-white transition-all"
                ></textarea>
              </div>

              <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    class="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                    >{{ $t("label_region") }}</label
                  >
                  <input
                    type="text"
                    required
                    v-model="form.region"
                    class="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
                  />
                </div>
                <div>
                  <label
                    class="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                    >{{ $t("label_city") }}</label
                  >
                  <input
                    type="text"
                    required
                    v-model="form.city"
                    class="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
                  />
                </div>
                <div>
                  <label
                    class="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                    >{{ $t("label_province") }}</label
                  >
                  <input
                    type="text"
                    required
                    v-model="form.province"
                    class="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
                  />
                </div>
                <div>
                  <label
                    class="block mb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                    >{{ $t("label_postal_code") }}</label
                  >
                  <input
                    type="text"
                    required
                    v-model="form.postal_code"
                    class="w-full p-3 text-sm font-medium border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006A4E] outline-none transition-all"
                  />
                </div>
              </div>

              <input type="hidden" :value="form.latitude" />
              <input type="hidden" :value="form.longitude" />

              <div
                class="flex items-center gap-3 p-4 mt-2 transition-colors border border-gray-200 cursor-pointer rounded-xl bg-gray-50 hover:bg-gray-100"
                @click="form.is_default = !form.is_default"
              >
                <input
                  type="checkbox"
                  id="is_default"
                  v-model="form.is_default"
                  class="w-5 h-5 rounded cursor-pointer text-[#006A4E] focus:ring-[#006A4E] accent-[#006A4E]"
                  @click.stop
                />
                <label
                  for="is_default"
                  class="text-sm font-bold text-gray-800 cursor-pointer select-none"
                  @click.stop
                >
                  {{ $t("label_set_default_address") }}
                </label>
              </div>
            </div>

            <div class="flex justify-end gap-3 pt-6 mt-auto border-t border-gray-100">
              <button
                type="button"
                @click="isModalOpen = false"
                class="px-6 py-3 text-sm font-bold text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200"
              >
                {{ $t("btn_cancel") }}
              </button>
              <button
                type="submit"
                class="px-6 py-3 text-sm font-bold text-white transition-all shadow-md bg-[#006A4E] rounded-xl hover:bg-emerald-900 hover:shadow-lg"
              >
                {{ editingId ? $t("btn_update_address") : $t("btn_save_address") }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { useCart } from "../../composables/useCart.js";
import { Country, State } from "country-state-city";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

const router = useRouter();
const route = useRoute();
const getAxiosConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

const { cartItems, checkoutCount, selectedItemIds, clearSelectedCart } = useCart();

const userData = ref(null);
const addresses = ref([]);
const selectedAddressId = ref(null);
const isProcessing = ref(false);
const shippingMethod = ref("free");
const selectedRate = ref(null);
const isLoadingRates = ref(false);
const deliveryType = ref("now");
const deliveryDate = ref("");
const deliveryTime = ref("");
const pointsToUse = ref(0);
const promoInput = ref("");
const appliedPromoCode = ref(null);
const promoDiscountAmount = ref(0);
const appliedPromoType = ref(null);
const promoMessage = ref("");
const promoSuccess = ref(false);
const isVerifyingPromo = ref(false);
const rawShippingRates = ref([]);
const isPageLoading = ref(true);

const availablePoints = ref(0);
const pointsInput = ref("");
const pointsUsed = ref(0);
const pointConversionRate = 1000;

const userType = ref("guest");
const useMemberVoucher = ref(false);
const MEMBER_VOUCHER_CODE = "SOLHERMEMBER";
const MEMBER_MIN_SPEND = 1000000;
const currentCurrency = ref(localStorage.getItem("currency") || "IDR");
const exchangeRates = ref({});

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
};

// --- DATA CROSS-REFERENCING (KATALOG ASLI) ---
const catalogProducts = ref([]);
const getFreshProduct = (cartProduct) => {
  if (catalogProducts.value.length > 0 && cartProduct) {
    const fresh = catalogProducts.value.find((p) => p.id === cartProduct.id);
    if (fresh) return fresh;
  }
  return cartProduct;
};

// --- HELPER MULTI CURRENCY ---
const getPriceToDisplay = (product) => {
  if (!product) return { value: 0, curr: "IDR" };
  const curr = currentCurrency.value;
  if (curr === "IDR") return { value: Number(product.price), curr: "IDR" };

  try {
    const pricesObj =
      typeof product.prices === "string"
        ? JSON.parse(product.prices)
        : product.prices || {};
    const dbPrice =
      pricesObj[curr] ||
      pricesObj[curr.toLowerCase()] ||
      pricesObj[currentCurrency.value.toUpperCase()];
    if (dbPrice) return { value: parseFloat(dbPrice), curr: curr };
  } catch (e) {}

  return { value: Number(product.price), curr: "IDR" };
};

const getDiscountToDisplay = (product) => {
  if (!product) return null;
  const curr = currentCurrency.value;
  if (curr === "IDR")
    return product.discount_price
      ? { value: Number(product.discount_price), curr: "IDR" }
      : null;

  try {
    const discObj =
      typeof product.discount_prices === "string"
        ? JSON.parse(product.discount_prices)
        : product.discount_prices || {};
    const dbDisc =
      discObj[curr] ||
      discObj[curr.toLowerCase()] ||
      discObj[currentCurrency.value.toUpperCase()];
    if (dbDisc) return { value: parseFloat(dbDisc), curr: curr };
  } catch (e) {}

  return product.discount_price
    ? { value: Number(product.discount_price), curr: "IDR" }
    : null;
};

const formatCurrencyDisplay = (priceObj) => {
  if (!priceObj) return "";
  const { value, curr } = priceObj;
  const symbols = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };

  const formatter = new Intl.NumberFormat(curr === "IDR" ? "id-ID" : "en-US", {
    minimumFractionDigits: curr === "IDR" ? 0 : 2,
    maximumFractionDigits: curr === "IDR" ? 0 : 2,
  });

  return `${symbols[curr] || curr + " "}${formatter.format(value)}`;
};

const getActivePriceObj = (product) => {
  const isReseller = userType.value === "reseller";
  const wholesale = Number(product.wholesale_price) || 0;
  const voucher = Number(product.voucher_discount_price) || 0;

  if (appliedPromoType.value === "voucher" && voucher > 0) {
    return { value: voucher, curr: "IDR" };
  }

  const dynamicPriceObj = getPriceToDisplay(product);
  const dynamicDiscountObj = getDiscountToDisplay(product);

  if (isReseller && wholesale > 0 && checkoutCount.value >= 24) {
    return { value: wholesale, curr: "IDR" };
  } else if (
    dynamicDiscountObj &&
    dynamicDiscountObj.value > 0 &&
    dynamicDiscountObj.value < dynamicPriceObj.value
  ) {
    return dynamicDiscountObj;
  }
  return dynamicPriceObj;
};

const convertIDRtoActiveCurrency = (idrAmount) => {
  const curr = currentCurrency.value;
  if (curr === "IDR" || !exchangeRates.value[curr])
    return { value: idrAmount, curr: "IDR" };
  return { value: idrAmount * exchangeRates.value[curr], curr: curr };
};

// --- KALKULASI TOTAL ---
const checkoutItems = computed(() => {
  let baseItems = cartItems.value.filter((item) =>
    selectedItemIds.value.includes(item.id)
  );
  if (catalogProducts.value.length > 0) {
    baseItems = baseItems.map((item) => {
      const fresh = catalogProducts.value.find((p) => p.id === item.product_id);
      return fresh ? { ...item, product: fresh } : item;
    });
  }
  return baseItems;
});

const checkoutTotalIDR = computed(() => {
  return checkoutItems.value.reduce((sum, item) => {
    const freshProd = getFreshProduct(item.product);
    const isReseller = userType.value === "reseller";
    const wholesale = Number(freshProd.wholesale_price) || 0;
    const discount = Number(freshProd.discount_price) || 0;
    let priceToUse = Number(freshProd.price) || 0;

    if (isReseller && wholesale > 0 && checkoutCount.value >= 24) {
      priceToUse = wholesale;
    } else if (discount > 0 && discount < priceToUse) {
      priceToUse = discount;
    }

    if (
      appliedPromoType.value === "voucher" &&
      Number(freshProd.voucher_discount_price) > 0
    ) {
      priceToUse = Number(freshProd.voucher_discount_price);
    }
    return sum + priceToUse * item.quantity;
  }, 0);
});

const cartSubtotalObj = computed(() => {
  const curr = currentCurrency.value;
  const totalValue = checkoutItems.value.reduce((sum, item) => {
    const activeObj = getActivePriceObj(item.product);
    let val = activeObj.value;

    if (activeObj.curr === "IDR" && curr !== "IDR") {
      val = val * (exchangeRates.value[curr] || 1);
    }
    return sum + val * item.quantity;
  }, 0);
  return { value: totalValue, curr };
});

const actualPromoDiscountIDR = computed(() => {
  if (appliedPromoType.value === "claim") {
    const productDiscount = Math.floor(checkoutTotalIDR.value * 0.1);
    let shippingCost = 0;
    if (shippingMethod.value === "biteship" && selectedRate.value) {
      shippingCost = parseFloat(selectedRate.value.price) * checkoutCount.value;
    }
    const shippingSubsidy = Math.min(10000, shippingCost);
    return productDiscount + shippingSubsidy;
  }
  return promoDiscountAmount.value;
});
const actualPromoDiscountObj = computed(() =>
  convertIDRtoActiveCurrency(actualPromoDiscountIDR.value)
);

const maxPointsAllowed = computed(() => {
  const maxUsableAmount = Math.max(
    0,
    checkoutTotalIDR.value - actualPromoDiscountIDR.value
  );
  return Math.min(availablePoints.value, Math.floor(maxUsableAmount / 1000));
});

const appliedPointDiscountIDR = computed(() => pointsUsed.value * 1000);
const appliedPointDiscountObj = computed(() =>
  convertIDRtoActiveCurrency(appliedPointDiscountIDR.value)
);

const shippingCostIDR = computed(() =>
  shippingMethod.value === "biteship" && selectedRate.value
    ? parseFloat(selectedRate.value.price) * checkoutCount.value
    : 0
);
const shippingCostObj = computed(() => convertIDRtoActiveCurrency(shippingCostIDR.value));

const grandTotalObj = computed(() => {
  return {
    value:
      cartSubtotalObj.value.value +
      shippingCostObj.value.value -
      actualPromoDiscountObj.value.value -
      appliedPointDiscountObj.value.value,
    curr: currentCurrency.value,
  };
});

const parseColorName = (colorString) => {
  if (!colorString) return "";
  try {
    const parsed = JSON.parse(colorString);
    if (parsed.name) return parsed.name;
  } catch {}
  return colorString.includes("|") ? colorString.split("|")[0] : colorString;
};

const parseColorHex = (colorString) => {
  if (!colorString) return "#cccccc";
  try {
    const parsed = JSON.parse(colorString);
    if (parsed.hex) return parsed.hex;
  } catch {}
  return colorString.includes("|") ? colorString.split("|")[1] : colorString;
};

const imageErrors = ref({});
const handleImageError = (company) => {
  imageErrors.value[company] = true;
};

const destinationInfo = computed(() => {
  if (!selectedAddressId.value || !addresses.value) return null;
  const addr = addresses.value.find((a) => a.id === selectedAddressId.value);
  if (!addr) return null;

  return {
    name: addr.receiver?.full_name || "Unknown",
    phone: userData.value?.phone || "No Phone Provided",
    address: `${addr.details?.location || ""}, ${addr.details?.city || ""}, ${
      addr.details?.province || ""
    }`,
    postal_code: addr.postal_code || addr.details?.postal_code || "",
    country: addr.region || addr.details?.region || "Indonesia",
  };
});

const getCourierLogo = (company) => {
  const baseUrl = "/courier_images/";
  const map = {
    jne: "jne.png",
    sicepat: "sicepat.png",
    jnt: "jnt.png",
    anteraja: "anteraja.png",
    gojek: "gojek.png",
    grab: "grab.png",
    paxel: "paxel.png",
    ninja: "ninja.png",
    dhl: "dhl.png",
  };
  return map[company.toLowerCase()] ? baseUrl + map[company.toLowerCase()] : null;
};

const isModalOpen = ref(false);
const countries = ref(Country.getAllCountries());
const filteredProvinces = ref([]);
const form = ref({
  id: null,
  region: "Indonesia",
  first_name_address: "",
  last_name_address: "",
  address_location: "",
  location_type: "",
  city: "",
  province: "",
  postal_code: "",
  latitude: null,
  longitude: null,
  is_default: true,
});

const fetchProvinces = () => {
  const selectedCountry = countries.value.find((c) => c.name === form.value.region);
  if (selectedCountry) {
    const states = State.getStatesOfCountry(selectedCountry.isoCode);
    filteredProvinces.value = states.map((s) => s.name);
  } else {
    filteredProvinces.value = [];
  }
};

const openModal = () => {
  form.value = {
    region: "Indonesia",
    is_default: true,
    first_name_address: userData.value?.first_name || "",
    last_name_address: userData.value?.last_name || "",
    address_location: "",
    location_type: "home",
    city: "",
    province: "",
    postal_code: "",
    latitude: null,
    longitude: null,
  };
  fetchProvinces();
  isModalOpen.value = true;
};

const handleSearchInput = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  if (searchQuery.value.length < 3) {
    searchResults.value = [];
    return;
  }
  debounceTimeout = setTimeout(async () => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery.value}&countrycodes=id&limit=5`
      );
      searchResults.value = res.data;
    } catch (error) {}
  }, 500);
};

const selectSearchResult = (result) => {
  const lat = parseFloat(result.lat);
  const lng = parseFloat(result.lon);
  if (map.value && map.value.leafletObject) map.value.leafletObject.flyTo([lat, lng], 16);
  else {
    center.value = [lat, lng];
    zoom.value = 16;
  }
  markerLatLng.value = [lat, lng];
  form.value.latitude = lat.toString();
  form.value.longitude = lng.toString();
  form.value.address_location = result.display_name;
  searchResults.value = [];
  searchQuery.value = "";
};

const onMapClick = (event) => {
  const { lat, lng } = event.latlng;
  updateLocation(lat, lng);
};
const onMarkerDrag = (event) => {
  const { lat, lng } = event.target.getLatLng();
  updateLocation(lat, lng);
};
const updateLocation = (lat, lng) => {
  markerLatLng.value = [lat, lng];
  form.value.latitude = lat.toString();
  form.value.longitude = lng.toString();
  reverseGeocode(lat, lng);
};

const reverseGeocode = async (lat, lng) => {
  try {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    if (res.data && res.data.display_name) {
      form.value.address_location = res.data.display_name;
      if (res.data.address && res.data.address.postcode)
        form.value.postal_code = res.data.address.postcode;
    }
  } catch (error) {}
};

const getCurrentLocation = () => {
  setIsGettingLocation(true);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        if (map.value && map.value.leafletObject)
          map.value.leafletObject.flyTo([lat, lng], 16);
        else {
          center.value = [lat, lng];
          zoom.value = 16;
        }
        updateLocation(lat, lng);
        setIsGettingLocation(false);
      },
      () => {
        Swal.fire("Error", "Please allow location access.", "error");
        setIsGettingLocation(false);
      }
    );
  }
};

const map = ref(null);
const zoom = ref(13);
const center = ref([-7.250445, 112.768845]);
const markerLatLng = ref([-7.250445, 112.768845]);
const searchQuery = ref("");
const searchResults = ref([]);
let debounceTimeout = null;

const saveAddress = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/addresses`, form.value, getAxiosConfig());
    isModalOpen.value = false;
    const resAddr = await axios.get(`${BASE_URL}/addresses`, getAxiosConfig());
    addresses.value = resAddr.data.data;
    selectedAddressId.value =
      res.data.id || res.data.data?.id || addresses.value[addresses.value.length - 1].id;
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Address Saved!",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (e) {
    Swal.fire("Error", "Failed to save address", "error");
  }
};

const isButtonDisabled = computed(() => {
  if (isProcessing.value || cartItems.value.length === 0 || !selectedAddressId.value)
    return true;
  if (shippingMethod.value === "biteship") {
    if (!selectedRate.value) return true;
    if (
      deliveryType.value === "scheduled" &&
      (!deliveryDate.value || !deliveryTime.value)
    )
      return true;
  }
  return false;
});

watch(selectedAddressId, async (newVal) => {
  if (newVal) {
    if (!selectedItemIds || selectedItemIds.length === 0) return;
    selectedRate.value = null;
    isLoadingRates.value = true;
    rawShippingRates.value = [];
    try {
      const res = await axios.post(
        `${BASE_URL}/shipping/rates`,
        { address_id: newVal, cart_ids: selectedItemIds },
        getAxiosConfig()
      );
      if (res.data && res.data.data) {
        rawShippingRates.value = res.data.data;
      } else if (res.data && res.data.rates) {
        rawShippingRates.value = res.data.rates;
      } else if (res.data && res.data.pricing) {
        rawShippingRates.value = res.data.pricing;
      }
    } catch (error) {
      if (error.response?.status === 401) return router.push("/login");
    } finally {
      isLoadingRates.value = false;
    }
  }
});

const processedShippingRates = computed(() => {
  if (!rawShippingRates.value || rawShippingRates.value.length === 0) return [];
  return rawShippingRates.value.map((rate) => {
    const isShippo = rate.provider !== undefined;
    return {
      ...rate,
      company: isShippo ? rate.provider : rate.company,
      type: isShippo ? rate.service_name : rate.type,
      duration: isShippo ? rate.etd : rate.duration,
      courier_name: isShippo ? "Global Express" : rate.courier_name,
      price: rate.price,
      is_disabled: false,
      disable_reason: "",
    };
  });
});

const handlePayment = async () => {
  isProcessing.value = true;
  try {
    const payload = {
      address_id: selectedAddressId.value,
      shipping_method: shippingMethod.value,
      use_points: pointsUsed.value,
      cart_ids: selectedItemIds,
      courier_company:
        shippingMethod.value === "biteship" ? selectedRate.value?.company : null,
      courier_type: shippingMethod.value === "biteship" ? selectedRate.value?.type : null,
      shipping_cost:
        shippingMethod.value === "biteship" ? selectedRate.value?.price : null,
      delivery_type: shippingMethod.value === "biteship" ? deliveryType.value : null,
      delivery_date: shippingMethod.value === "biteship" ? deliveryDate.value : null,
      delivery_time: shippingMethod.value === "biteship" ? deliveryTime.value : null,
      promo_code: appliedPromoCode.value,
      promo_type: appliedPromoType.value,
      currency: currentCurrency.value,
      referral_code: localStorage.getItem("affiliate_ref"),
    };
    const res = await axios.post(`${BASE_URL}/checkout`, payload, getAxiosConfig());
    if (res.data.checkout_url) {
      clearSelectedCart();
      window.location.href = res.data.checkout_url;
    }
  } catch (error) {
    Swal.fire(
      "Payment Error",
      error.response?.data?.message || "Failed to create invoice",
      "error"
    );
  } finally {
    isProcessing.value = false;
  }
};

onMounted(async () => {
  window.addEventListener("currency-changed", updateCurrencyState);
  window.addEventListener("storage", (e) => {
    if (e.key === "currency") updateCurrencyState();
  });

  try {
    const res = await axios.get(`${BASE_URL}/exchange-rates`);
    if (res.data && res.data.data && res.data.data.rates) {
      exchangeRates.value = res.data.data.rates;
    }
  } catch (e) {}

  try {
    const resCatalog = await axios.get(`${BASE_URL}/products`);
    const dataCat =
      resCatalog.data?.data?.data || resCatalog.data?.data || resCatalog.data;
    if (Array.isArray(dataCat)) {
      setCatalogProducts(dataCat);
    }
  } catch (e) {}

  try {
    const user = localStorage.getItem("user_data");
    if (user) {
      userData.value = JSON.parse(user);
      setAvailablePoints(userData.value.point || 0);
      setUserType(userData.value.usertype || "user");
    }
    const resAddr = await axios.get(`${BASE_URL}/addresses`, getAxiosConfig());
    addresses.value = resAddr.data.data || resAddr.data;
    if (addresses.value.length > 0) {
      const defaultAddr = addresses.value.find((a) => a.is_default);
      selectedAddressId.value = defaultAddr ? defaultAddr.id : addresses.value[0].id;
    }

    if (selectedItemIds.length === 0) {
      router.push(`${urlPrefix}/cart`);
    } else {
      const now = new Date();
      now.setHours(now.getHours() + 1);
      deliveryDate.value = now.toISOString().split("T")[0];
      deliveryTime.value = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;
    }
  } catch (error) {
  } finally {
    isPageLoading.value = false;
  }
});

onUnmounted(() => {
  window.removeEventListener("currency-changed", updateCurrencyState);
});

const calculateEarnedPoints = computed(() => Math.floor(checkoutTotalIDR.value / 100000));

const handleMemberToggle = async () => {
  if (useMemberVoucher.value) {
    if (checkoutTotalIDR.value < MEMBER_MIN_SPEND) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "warning",
        title: `Min. spend is Rp ${MEMBER_MIN_SPEND.toLocaleString("id-ID")}`,
        showConfirmButton: false,
        timer: 3000,
      });
      useMemberVoucher.value = false;
      return;
    }
    promoInput.value = MEMBER_VOUCHER_CODE;
    await applyPromo();
    if (!promoSuccess.value) useMemberVoucher.value = false;
  } else {
    if (appliedPromoCode.value === MEMBER_VOUCHER_CODE) removePromo();
  }
};

const applyPromo = async () => {
  if (!promoInput.value) return;
  isVerifyingPromo.value = true;
  try {
    const codeToBeApplied = promoInput.value.toUpperCase();
    const res = await axios.post(
      `${BASE_URL}/promo/verify`,
      {
        promo_code: codeToBeApplied,
        cart_items: checkoutItems.value.map((item) => ({ product_id: item.product_id })),
      },
      getAxiosConfig()
    );
    if (
      codeToBeApplied === MEMBER_VOUCHER_CODE &&
      checkoutTotalIDR.value < MEMBER_MIN_SPEND
    )
      throw new Error(`Minimum spend is Rp ${MEMBER_MIN_SPEND.toLocaleString("id-ID")}`);
    else if (codeToBeApplied !== MEMBER_VOUCHER_CODE && checkoutTotalIDR.value < 499000)
      throw new Error("Minimum spend is Rp 499.000");

    promoSuccess.value = true;
    promoMessage.value = "✅ " + res.data.message;
    appliedPromoCode.value = codeToBeApplied;
    promoDiscountAmount.value = Math.min(res.data.discount_value, checkoutTotalIDR.value);
    setAppliedPromoType(res.data.promo_type);

    if (appliedPromoCode.value === MEMBER_VOUCHER_CODE) useMemberVoucher.value = true;
    if (pointsToUse.value > maxPointsAllowed.value)
      pointsToUse.value = maxPointsAllowed.value;
  } catch (error) {
    promoSuccess.value = false;
    promoMessage.value =
      "❌ " + (error.response?.data?.message || error.message || "Invalid promo code.");
    appliedPromoCode.value = null;
    promoDiscountAmount.value = 0;
    setAppliedPromoType(null);
    useMemberVoucher.value = false;
  } finally {
    isVerifyingPromo.value = false;
  }
};

const removePromo = () => {
  promoInput.value = "";
  appliedPromoCode.value = null;
  appliedPromoType.value = null;
  promoDiscountAmount.value = 0;
  promoMessage.value = "";
  promoSuccess.value = false;
  useMemberVoucher.value = false;
};
const useAllPoints = () => {
  pointsToUse.value = maxPointsAllowed.value;
};
</script>

<style scoped>
.animate-bounce-1 {
  animation: bounceDots 1.4s infinite ease-in-out both;
  animation-delay: -0.32s;
}
.animate-bounce-2 {
  animation: bounceDots 1.4s infinite ease-in-out both;
  animation-delay: -0.16s;
}
.animate-bounce-3 {
  animation: bounceDots 1.4s infinite ease-in-out both;
}
@keyframes bounceDots {
  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style>
