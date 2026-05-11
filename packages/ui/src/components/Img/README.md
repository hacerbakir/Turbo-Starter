# Img Component

Next.js Image wrapper - Art direction ve responsive görseller için.

## Özellikler

- ✅ **Art Direction** - Farklı breakpoint'lerde farklı görseller
- ✅ **Her zaman fill mode** - Container'ı tamamen doldurur
- ✅ **Tailwind class kontrolü** - Boyut ve aspect ratio Tailwind ile
- ✅ **Fallback image** - Hata durumunda placeholder
- ✅ **Object-fit/position** - Görsel konumlandırma kontrolü
- ✅ **Next.js optimization** - WebP, AVIF, lazy loading

## Temel Kullanım

```tsx
import { Img } from 'ui';

// Basit kullanım
<Img src='/image.jpg' alt='Description' containerClassName='w-full h-64 md:h-96' />;
```

## Art Direction (Responsive Different Images)

Farklı ekran boyutlarında farklı görseller göster:

```tsx
<Img
  sources={[
    {
      media: '(max-width: 640px)',
      src: '/mobile-portrait.jpg', // Mobilde dikey
    },
    {
      media: '(max-width: 1024px)',
      src: '/tablet-landscape.jpg', // Tablette yatay
    },
    {
      src: '/desktop-wide.jpg', // Desktop'ta ultra-wide
    },
  ]}
  alt='Responsive Art Direction'
  containerClassName='aspect-[3/4] sm:aspect-video lg:aspect-[21/9]'
/>
```

## Boyutlandırma (containerClassName)

Container boyutu tamamen Tailwind classes ile kontrol edilir:

### Fixed Dimensions

```tsx
<Img src='/image.jpg' alt='Fixed Size' containerClassName='w-96 h-64' />
```

### Responsive Aspect Ratios

```tsx
<Img src='/image.jpg' alt='Responsive Aspect' containerClassName='aspect-square md:aspect-video lg:aspect-[21/9]' />
```

### Full Width Responsive Height

```tsx
<Img src='/image.jpg' alt='Full Width' containerClassName='w-full h-64 md:h-96 lg:h-screen' />
```

### Fill Parent Container

```tsx
<div className='w-full h-96'>
  <Img src='/image.jpg' alt='Fill Parent' containerClassName='w-full h-full' />
</div>
```

## Props

| Prop                   | Type               | Default                   | Description                            |
| ---------------------- | ------------------ | ------------------------- | -------------------------------------- |
| `src`                  | `string \| object` | -                         | Tek görsel URL'i                       |
| `sources`              | `ImgSource[]`      | -                         | Art direction için source listesi      |
| `alt`                  | `string`           | ✅ Required               | Alt text                               |
| `containerClassName`   | `string`           | `''`                      | **Container boyut kontrolü (önemli!)** |
| `objectFit`            | `string`           | `'cover'`                 | CSS object-fit                         |
| `objectPosition`       | `string`           | `'center'`                | CSS object-position                    |
| `fallbackSrc`          | `string`           | `/images/placeholder.png` | Hata durumu görseli                    |
| `className`            | `string`           | `''`                      | Image element className                |
| `onError`              | `() => void`       | -                         | Hata callback                          |
| ...Next.js Image props | -                  | -                         | Tüm Next.js Image props                |

### ImgSource Type

```typescript
{
  src: string;           // Görsel URL
  media?: string;        // Media query, örn: "(max-width: 640px)"
  type?: string;         // MIME type, örn: "image/webp"
}
```

## Gerçek Örnekler

### Hero Section (Mobil Dikey → Desktop Yatay)

```tsx
<Img
  sources={[
    {
      media: '(max-width: 768px)',
      src: '/hero-mobile-portrait.jpg',
    },
    {
      src: '/hero-desktop-wide.jpg',
    },
  ]}
  alt='Hero'
  containerClassName='aspect-[3/4] md:aspect-[21/9]'
  objectPosition='center 30%'
  priority
/>
```

### Product Card Grid

```tsx
// 3 sütunlu grid
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
  {products.map((product) => (
    <Img
      key={product.id}
      src={product.image}
      alt={product.name}
      containerClassName='aspect-square'
      objectFit='contain'
      className='bg-gray-100'
    />
  ))}
</div>
```

### Blog Featured Image

```tsx
<Img
  src={post.featuredImage}
  fallbackSrc='/blog-placeholder.jpg'
  alt={post.title}
  containerClassName='w-full aspect-[16/9] rounded-lg overflow-hidden'
  placeholder='blur'
  blurDataURL={post.blurDataURL}
/>
```

### User Avatar

```tsx
<Img
  src={user.avatar}
  fallbackSrc='/default-avatar.png'
  alt={user.name}
  containerClassName='w-12 h-12 rounded-full'
  sizes='48px'
/>
```

### Responsive Banner

```tsx
<Img
  sources={[
    {
      media: '(max-width: 640px)',
      src: '/banner-mobile.jpg', // 600x400
    },
    {
      media: '(max-width: 1024px)',
      src: '/banner-tablet.jpg', // 1200x400
    },
    {
      src: '/banner-desktop.jpg', // 1920x500
    },
  ]}
  alt='Promo Banner'
  containerClassName='w-full h-32 sm:h-40 lg:h-56'
  objectFit='cover'
/>
```

## Aspect Ratio Örnekleri

### Tailwind Hazır Ratios

```tsx
aspect - square; // 1:1
aspect - video; // 16:9
aspect - auto; // Original
```

### Custom Ratios

```tsx
aspect - [4 / 3]; // 4:3
aspect - [3 / 4]; // 3:4 (portrait)
aspect - [21 / 9]; // Ultra-wide
aspect - [1 / 2]; // Very tall
aspect - [2 / 1]; // Very wide
```

### Responsive Combinations

```tsx
// Mobile portrait → Tablet square → Desktop wide
containerClassName = 'aspect-[3/4] md:aspect-square lg:aspect-[21/9]';

// Mobile full height → Desktop aspect ratio
containerClassName = 'h-screen md:h-auto md:aspect-video';
```

## Next.js Config

External domain'lerden görsel için `next.config.ts`:

```typescript
export default {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
};
```

## Best Practices

1. **Container className her zaman belirtin** - Boyut kontrolü için
2. **Art direction dikkatli kullanın** - Her breakpoint için optimize edilmiş görseller
3. **fallbackSrc mutlaka ayarlayın** - Hata durumları için
4. **priority kullanın** - Above-the-fold görsellerde
5. **sizes prop ekleyin** - Next.js optimization için
6. **Alt text unutmayın** - Accessibility için şart

## Performance Tips

- ✅ `priority` - LCP için kritik görsellerde
- ✅ `placeholder="blur"` - Better UX
- ✅ `sizes` prop - Doğru boyut seçimi
- ✅ `loading="lazy"` - Below-fold görsellerde (default)
- ✅ Modern formats - Next.js otomatik WebP/AVIF
