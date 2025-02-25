<script setup lang="ts"></script>

<template>
    <div class="p-2">
        <router-view v-slot="{ Component, route }">
            <keep-alive>
                <component :is="Component" :key="route.fullPath" />
            </keep-alive>
        </router-view>
    </div>
</template>
