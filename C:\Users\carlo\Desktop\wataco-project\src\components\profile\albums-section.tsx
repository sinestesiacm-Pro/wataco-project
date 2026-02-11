'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Images, Plus, Share2, Trash2, Edit } from "lucide-react";
import Image from "next/image";

const albums = [
  { id: 1, name: "Verano en Grecia", cover: "https://images.unsplash.com/photo-1563823434121-b85de130e0a4?w=500", photoCount: 45 },
  { id: 2, name: "Aventura en los Andes", cover: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500", photoCount: 78 },
  { id: 3, name: "Escapada a Roma", cover: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8cm9tYXxlbnwwfHx8fDE3NTQ4NDMyNDV8MA&ixlib=rb-4.1.0&q=80&w=1080", photoCount: 32 },
  { id: 4, name: "Neones de Tokio", cover: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=500", photoCount: 112 },
];

export function AlbumsSection() {
  return (
    <Card className="bg-black/20 backdrop-blur-xl border-none text-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-3 text-2xl font-headline text-white">
          <Images className="h-6 w-6" />
          <span>Mis Álbumes</span>
        </CardTitle>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Crear Nuevo Álbum
        </Button>
      </CardHeader>
      <CardContent>
        {albums.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
              <Card key={album.id} className="group relative overflow-hidden rounded-2xl bg-black/30 border-white/20 shadow-lg hover:shadow-xl transition-all">
                <Image
                  src={album.cover}
                  alt={album.name}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <h3 className="font-bold text-white text-lg drop-shadow-md">{album.name}</h3>
                  <p className="text-sm text-white/80 drop-shadow-md">{album.photoCount} fotos</p>
                </div>
                 <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="outline" className="h-8 w-8 bg-black/40 hover:bg-black/60 border-white/30 hover:border-white/50">
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="h-8 w-8 bg-black/40 hover:bg-black/60 border-white/30 hover:border-white/50">
                        <Share2 className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="destructive" className="h-8 w-8 bg-destructive/50 hover:bg-destructive/70 border-destructive/80 hover:border-destructive">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-white/20 rounded-2xl">
            <p className="text-white/70">Aún no has creado ningún álbum.</p>
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Sube tus primeras fotos
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
