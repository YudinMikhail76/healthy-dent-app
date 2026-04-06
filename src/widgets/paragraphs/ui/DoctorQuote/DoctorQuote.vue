<template>
    <div class="doctor-quote">
        <div class="doctor-quote__title">
            {{ data?.title }}
        </div>
        <div class="doctor-quote__row">
            <div class="doctor-quote__texts">
                <div class="doctor-quote__quote-title">
                    {{ data.quote?.title }}
                </div>
                <div class="doctor-quote__quote-description">
                    {{ data.quote?.text }}
                </div>
            </div>
            <div class="doctor-quote__author">
                <div class="doctor-quote__photo-container">
                    <AppImage
                        :urls="data.photo?.urls"
                        class="doctor-quote__photo"
                        :alt="data.photo?.alt"
                        :title="data.photo?.title" 
                        fit="contain"
                        loading="lazy"
                    />
                </div>
                <div class="doctor-quote__author-info">
                    <div class="doctor-quote__author-full-name">
                        {{ data.author?.name }}
                    </div>
                    <div class="doctor-quote__author-description">
                        {{ data.author?.description }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppImage from '~/shared/ui/Media/AppImage.vue'

defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.doctor-quote {
    padding: 20px;
    margin: 40px 0;
    background-color: $light;
    border-radius: 15px;

    @media (min-width: $tablet-breakpoint) {
        padding: 30px;
        margin: 60px 0;
        border-radius: 20px;
    }

    @media (min-width: $desktop-breakpoint) {
        padding: 40px;
        margin: 80px 0;
        border-radius: 25px;
    }

    @media (min-width: $lg-desktop-breakpoint) {
        padding: 48px;
        margin: 96px 0;
        border-radius: 30px;
    }

    &__row {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 40px;

        @media (min-width: $tablet-breakpoint) {
            gap: 48px;
        }
        
        @media (min-width: $desktop-breakpoint) {
            flex-direction: row-reverse;
            gap: 64px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            gap: 96px;
        }
    }

    &__texts {
        @media (min-width: $desktop-breakpoint) {
            width: 58.333%;
        }
      
        @media (min-width: $lg-desktop-breakpoint) {
            width: auto;
        }
    }

    &__title {
        margin-bottom: 20px;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            margin-bottom: 30px;
            font-size: 28px;
        }

        @media (min-width: $desktop-breakpoint) {
            margin-bottom: 40px;
            font-size: 32px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            margin-bottom: 48px;
            font-size: 48px;
        }
    }

    &__quote-title {
        position: relative;
        padding-top: 40px;
        margin-bottom: 10px;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%;

        @media (min-width: $tablet-breakpoint) {
            padding-top: 60px;
            margin-bottom: 15px;
            font-size: 22px;
        }

        @media (min-width: $desktop-breakpoint) {
            padding-top: 80px;
            margin-bottom: 20px;
            font-size: 24px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            padding-top: 96px;
            margin-bottom: 24px;
            font-size: 32px;
        }

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 20px;
            height: 20px;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9IjAyIj4KPHBhdGggaWQ9IlZlY3RvciIgZD0iTTExLjY2NjcgOS4xNjY2N0MxMS42NjY3IDUuNDkgMTQuNjU2NyAyLjUgMTguMzMzMyAyLjVDMTkuMjU1IDIuNSAyMCAzLjI0NSAyMCA0LjE2NjY3QzIwIDUuMDg4MzMgMTkuMjU1IDUuODMzMzMgMTguMzMzMyA1LjgzMzMzQzE2LjQ5NSA1LjgzMzMzIDE1IDcuMzI4MzMgMTUgOS4xNjY2N0gxNy41QzE4Ljg4IDkuMTY2NjcgMjAgMTAuMjg2NyAyMCAxMS42NjY3VjE0LjE2NjdDMjAgMTYuMDA4MyAxOC41MDgzIDE3LjUgMTYuNjY2NyAxNy41SDE0LjE2NjdDMTIuNzg2NyAxNy41IDExLjY2NjcgMTYuMzggMTEuNjY2NyAxNVY5LjE2NjY3Wk0wIDkuMTY2NjdDMCA1LjQ5IDIuOTkgMi41IDYuNjY2NjcgMi41QzcuNTg4MzMgMi41IDguMzMzMzMgMy4yNDUgOC4zMzMzMyA0LjE2NjY3QzguMzMzMzMgNS4wODgzMyA3LjU4ODMzIDUuODMzMzMgNi42NjY2NyA1LjgzMzMzQzQuODI4MzMgNS44MzMzMyAzLjMzMzMzIDcuMzI4MzMgMy4zMzMzMyA5LjE2NjY3SDUuODMzMzNDNy4yMTMzMyA5LjE2NjY3IDguMzMzMzMgMTAuMjg2NyA4LjMzMzMzIDExLjY2NjdWMTQuMTY2N0M4LjMzMzMzIDE2LjAwODMgNi44NDE2NyAxNy41IDUgMTcuNUgyLjVDMS4xMiAxNy41IDAgMTYuMzggMCAxNVY5LjE2NjY3WiIgZmlsbD0iIzFEQjBBOSIvPgo8L2c+Cjwvc3ZnPgo=');
            background-repeat: no-repeat;
            background-size: contain;

            @media (min-width: $tablet-breakpoint) {
                width: 30px;
                height: 30px;
            }

            @media (min-width: $desktop-breakpoint) {
                width: 40px;
                height: 40px;
            }
            
            @media (min-width: $lg-desktop-breakpoint) {
                width: 48px;
                height: 48px;
            }
        }
    }

    &__quote-description {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__author {
        display: flex;
        gap: 20px;

        @media (min-width: $tablet-breakpoint) {
            gap: 30px;
        }

        @media (min-width: $desktop-breakpoint) {
            flex-direction: column;
            gap: 20px;
            width: 33.333%;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            width: auto;
        }
    }

    &__photo-container {
        height: 144px;
        max-width: 144px;
        min-width: 144px;
        overflow: hidden;
        background-color: $dark-200;
        border-radius: 7px;

        @media (min-width: $desktop-breakpoint) {
            width: 100%;
            height: 256px;
            max-width: none;
            border-radius: 12px;
        }
    
        @media (min-width: $lg-desktop-breakpoint) {
            width: 384px;
            height: 384px;
            border-radius: 15px;
        }

        :deep(img) {
            object-position: bottom center;
        }
    }

    &__author-info {
        width: auto;
    }

    &__author-full-name {
        margin-bottom: 12px;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;

        @media (min-width: $tablet-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $desktop-breakpoint) {
            font-size: 18px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 20px;
        }
    }

    &__author-description {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        color: $primary-300;

        @media (min-width: $desktop-breakpoint) {
            font-size: 16px;
        }

        @media (min-width: $lg-desktop-breakpoint) {
            font-size: 18px;
        }
    }
}
</style>